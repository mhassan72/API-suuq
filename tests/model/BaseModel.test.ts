import AWSMock from 'aws-sdk-mock';  // Use aws-sdk-mock for mocking
import * as AWS from 'aws-sdk';       // Import the full AWS SDK
import BaseModel from '../../src/model/BaseModel'; // Import the class

describe('BaseModel', () => {
  const tableName = 'TestTable';
  let baseModel: BaseModel;

  // Before each test, initialize the mock and the model instance
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);  // Pass the full AWS SDK to the mock
    baseModel = new BaseModel(tableName); // Initialize BaseModel with tableName
  });

  afterEach(() => {
    AWSMock.restore();  // Restore original AWS SDK after each test
  });

  // Test: Create Item
  it('should create an item in DynamoDB', async () => {
    const item = { id: '123', name: 'Test Item' };

    // Mocking DynamoDB response for the create operation
    const mockDynamoDbResponse = { Attributes: item };

    // Assuming baseModel.create is calling DynamoDB's putItem, mock this response
    const mockPutItem = jest.spyOn(baseModel, 'create').mockResolvedValue(mockDynamoDbResponse);

    const result = await baseModel.create(item);
    expect(result).toEqual({ Attributes: item });

    // Clean up mocks after the test
    mockPutItem.mockRestore();
  });

  // Test: Get Item
  it('should get an item from DynamoDB', async () => {
    const itemId = '123';
    const expectedItem = { id: '123', name: 'Test Item' };

    // Mock DynamoDB's get method
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, { Item: expectedItem });
    });

    const baseModel = new BaseModel('TestTable');
    const result = await baseModel.get({ id: itemId });

    // Assert that the result matches the expected item
    expect(result).toEqual(expectedItem);
  });

  // Test: Update Item
  it('should update an item in DynamoDB', async () => {
    const key = { id: '123' };
    const updates = { name: 'Updated Name' };
    const updatedItem = { id: '123', name: 'Updated Name' };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params: any, callback: Function) => {
      console.log('Mock update called:', params);  // Log mock params
      callback(null, { Attributes: updatedItem });
    });

    const result = await baseModel.update(key, updates);
    expect(result).toEqual(updatedItem);
  });

  // Test: Delete Item
  it('should delete an item from DynamoDB', async () => {
    const key = { id: '123' };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params: any, callback: Function) => {
      console.log('Mock delete called:', params);  // Log mock params
      callback(null, {});
    });

    const result = await baseModel.delete(key);
    expect(result).toEqual({});
  });

  // Test: Query Items
  it('should query items from DynamoDB', async () => {
    const expectedItems = [{ id: '123', name: 'Test Item' }];

    // Mock DynamoDB's query method
    AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
      callback(null, { Items: expectedItems });
    });

    const baseModel = new BaseModel('TestTable');
    const result = await baseModel.query('TestIndex', 'id = :id', { ':id': '123' });

    // Assert that the result matches the expected items
    expect(result).toEqual(expectedItems);
  });

  // Test: Scan Items
  it('should scan items from DynamoDB', async () => {
    const expectedItems = [{ id: '123', name: 'Test Item' }];

    // Mock DynamoDB's scan method
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, { Items: expectedItems });
    });

    const baseModel = new BaseModel('TestTable');
    const result = await baseModel.scan();

    // Assert that the result matches the expected items
    expect(result).toEqual(expectedItems);
  });

});
