import BaseModel from './BaseModel';
import Product from './Product';

export default class Chat extends BaseModel {
    constructor() {
        super('Chats');
    }

    async all(): Promise<any[]> {
        return await this.scan();
    }

    async queryUserChats(userPhone: string): Promise<any> {
        // Query for products where the user is the seller
        const sellerParams = {
            TableName: this.tableName,
            IndexName: "seller-index",
            KeyConditionExpression: "seller = :userPhone",
            ExpressionAttributeValues: {
                ":userPhone": userPhone
            }
        };

        // Query products where the user is the owner
        const ownerParams = {
            TableName: this.tableName,
            IndexName: "owner-index",
            KeyConditionExpression: "#o = :userPhone",
            ExpressionAttributeNames: {
                "#o": "owner" // Avoid reserved keyword error
            },
            ExpressionAttributeValues: {
                ":userPhone": userPhone
            }
        };

        // Run both queries in parallel
        const [sellerResults, ownerResults] = await Promise.all([
            this.dynamoDb.query(sellerParams).promise(),
            this.dynamoDb.query(ownerParams).promise()
        ]);
    
        // Merge results
        const conversations = [...(sellerResults.Items || []), ...(ownerResults.Items || [])];

        // Extract unique product IDs
        const productIds = [...new Set(conversations.map(c => c.product_id))];

        // Fetch product details using batch fetch
        const productModel = new Product();
        const products = await productModel.batchFetchByIds(productIds);

        // Create a product lookup map for quick access
        const productMap = products.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {} as Record<string, any>);

        // Format the final response
        return conversations.map(convo => ({
            id: convo.id,
            chats: convo.chats || [],
            last_convo: convo.last_convo,
            owner: convo.owner,
            seller: convo.seller,
            product_id: convo.product_id,
            product: productMap[convo.product_id] || null
        }));
    }


    async findById(id: string): Promise<any | null> {
        // Fetch the conversation by ID
        const result = await this.dynamoDb.get({
            TableName: this.tableName,
            Key: { id },
        }).promise();
    
        if (!result.Item) return null; // Return null if no conversation is found
    
        const convo = result.Item;
    
        // Fetch product details
        const productModel = new Product();
        const product = await productModel.findById(convo.product_id);
    
        // Format response
        return {
            id: convo.id,
            last_convo: convo.last_convo,
            owner: convo.owner,
            seller: convo.seller,
            product_id: convo.product_id,
            product: product || null,
            chats: convo.chats || [] // Return empty array if chats are not present
        };
    }

    async batchFetchByIds(ids: string[]): Promise<any[]> {
        if (ids.length === 0) return [];

        const chunks = this.chunkArray(ids, 100);
        let results: any[] = [];

        for (const chunk of chunks) {
            const params = {
                RequestItems: {
                    [this.tableName]: {
                        Keys: chunk.map(id => ({ id })),
                    },
                },
            };
            try {
                const result = await this.dynamoDb.batchGet(params).promise();
                results = results.concat(result.Responses?.[this.tableName] as any[] || []);
            } catch (error: any) {
                console.error('Error fetching products:', error);
                throw new Error('Failed to fetch products');
            }
        }

        return results;
    }

    private chunkArray<T>(array: T[], size: number): T[][] {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
            array.slice(i * size, i * size + size)
        );
    }
}
