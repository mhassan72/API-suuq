import BaseModel from './BaseModel';

export default class Product extends BaseModel {
  constructor() {
    super('Products');
  }

  async all(): Promise<any[]> {
    return await this.scan();
  }

  async findById(id: string): Promise<any | null> {
    const result = await this.dynamoDb.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();
    return result.Item as any || null;
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
