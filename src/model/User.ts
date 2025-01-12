import BaseModel from './BaseModel';

export default class User extends BaseModel {
  constructor() {
    super('Users'); // Specify the table name
  }

  async all(): Promise<any>{
    const users  = await this.scan()
    return users
  }

  // Add any custom methods for user-specific logic
  async findByPhone(phone: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'phone = :phone',
      ExpressionAttributeValues: {
        ':phone': phone,
      },
    };

    const result = await this.dynamoDb.query(params).promise();
    return result.Items?.[0];
  }
}

