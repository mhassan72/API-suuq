import BaseModel from './BaseModel';

export default class Product extends BaseModel {
  constructor() {
    super('Products'); // Specify the table name
  }

  async all(): Promise<any>{
    const products  = await this.scan()
    return products
  }

  async findById(id: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    };
    const result = await this.dynamoDb.query(params).promise();
    // Return the first item or undefined if no items are found
    return result.Items?.[0] ?? undefined;
  }

}