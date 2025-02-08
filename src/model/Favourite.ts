import BaseModel from './BaseModel';
import type { FavouriteItem } from '../types';
import Product from './Product'

export default class Favourite extends BaseModel {
  constructor() {
    super('Favourites');
  }

  async addFavorite(userId: string, productId: string): Promise<void> {
    const id = this.generateId(productId, userId);
    const favouriteItem: FavouriteItem = {
      id,
      productId,
      userId,
      createdAt: new Date().toISOString(),
    };

    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: favouriteItem,
    }).promise();
  }

  generateId(productId: string, userId: string): string {
    return `fav-${productId}-${userId}`;
  }

  async removeFavorite(id: string): Promise<void> {
    try {
      await this.dynamoDb.delete({
        TableName: this.tableName,
        Key: { id },
      }).promise();
    } catch (error: any) {
      console.error('Delete error:', error);
      throw new Error(`Failed to delete favorite ${id}: ${error.message}`);
    }
  }

  async getFavorite(userId: string, productId: string): Promise<FavouriteItem | null> {
    const id = this.generateId(productId, userId);
    const result = await this.dynamoDb.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();
    return result.Item as FavouriteItem || null;
  }

  async getFavouritesByUser(userId: string): Promise<FavouriteItem[]> {
    const params = {
      TableName: this.tableName,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const result = await this.dynamoDb.query(params).promise();
    const favouriteItems = result.Items as FavouriteItem[] || [];

    // Fetch related products
    const productIds = favouriteItems.map(fav => fav.productId);
    const products = await new Product().batchFetchByIds(productIds);

    return favouriteItems.map(fav => ({
      ...fav,
      product: products.find(p => p.id === fav.productId),
    }));
  }

  async getFavouritesByProduct(productId: string): Promise<FavouriteItem[]> {
    const params = {
      TableName: this.tableName,
      IndexName: 'productId-index',
      KeyConditionExpression: 'productId = :productId',
      ExpressionAttributeValues: {
        ':productId': productId,
      },
    };
    const result = await this.dynamoDb.query(params).promise();
    return result.Items as FavouriteItem[] || [];
  }
}
