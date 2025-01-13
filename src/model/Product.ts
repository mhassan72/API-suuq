import BaseModel from './BaseModel';

export default class Product extends BaseModel {
  constructor() {
    super('Products'); // Specify the table name
  }

  async all(): Promise<any>{
    const products  = await this.scan()
    return products
  }

}

export const product_instance = new Product()