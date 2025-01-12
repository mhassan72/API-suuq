import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import User from '../../src/model/User'; // Adjust path as needed

describe('User', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS); // Mock AWS SDK instance
  });

  afterAll(() => {
    AWSMock.restore(); // Restore the original SDK after tests
  });

  it('should retrieve all users from DynamoDB', async () => {
    const expectedUsers = [
      { phone: '1234567890', name: 'John Doe' },
      { phone: '0987654321', name: 'Jane Doe' }
    ];

    // Mock DynamoDB's scan method
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, { Items: expectedUsers });
    });

    const userModel = new User();
    const result = await userModel.all();

    // Assert that the result matches the expected users
    expect(result).toEqual(expectedUsers);
  });

  it('should find a user by phone number', async () => {
    const phone = '1234567890';
    const expectedUser = { phone: '1234567890', name: 'John Doe' };

    // Mock DynamoDB's query method
    AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
      callback(null, { Items: [expectedUser] });
    });

    const userModel = new User();
    const result = await userModel.findByPhone(phone);

    // Assert that the result matches the expected user
    expect(result).toEqual(expectedUser);
  });
  
});
