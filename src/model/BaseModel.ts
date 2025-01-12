import { DynamoDB } from 'aws-sdk';
import { envManager } from '../environment/EnvironmentManager';

export default class BaseModel {
  protected dynamoDb: DynamoDB.DocumentClient;
  protected tableName: string;

  constructor(tableName: string) {
    this.dynamoDb = new DynamoDB.DocumentClient({
      region: envManager.getAWSRegion(),
    });
    this.tableName = tableName;
  }

  // Shared methods for CRUD operations
  async create(item: Record<string, any>): Promise<any> {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    return this.dynamoDb.put(params).promise();
  }

  async get(key: Record<string, any>): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: key,
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item;
  }

  async update(key: Record<string, any>, updates: Record<string, any>): Promise<any> {
    const updateExpressions = Object.keys(updates)
      .map((attr, index) => `#attr${index} = :val${index}`)
      .join(', ');

    const expressionAttributeNames = Object.keys(updates).reduce(
      (acc, attr, index) => ({ ...acc, [`#attr${index}`]: attr }),
      {}
    );

    const expressionAttributeValues = Object.keys(updates).reduce(
      (acc, attr, index) => ({ ...acc, [`:val${index}`]: updates[attr] }),
      {}
    );

    const params = {
      TableName: this.tableName,
      Key: key,
      UpdateExpression: `SET ${updateExpressions}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDb.update(params).promise();
    return result.Attributes;
  }

  async delete(key: Record<string, any>): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: key,
    };
    return this.dynamoDb.delete(params).promise();
  }

  async query(indexName: string, keyConditionExpression: string, expressionAttributeValues: Record<string, any>): Promise<any> {
    const params = {
      TableName: this.tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    const result = await this.dynamoDb.query(params).promise();
    return result.Items;
  }

  async scan(): Promise<any> {
    const params = {
      TableName: this.tableName,
    };
    const result = await this.dynamoDb.scan(params).promise();
    return result.Items;
  }
}
