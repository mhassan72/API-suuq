
import { Request, Response } from 'express';
import Product from "../model/Product"; 

class ProductsController {
    private Product: Product;
  
    constructor() {
      this.Product = new Product();
      this.getAll = this.getAll.bind(this);
      this.getDetail = this.getDetail.bind(this);
    }
  
    async getAll(req: Request, res: Response): Promise<void> {
      try {
        const products  = await this.Product.scan()
        res.json({ products });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getDetail(req: Request, res: Response): Promise<void> {
      const productId = req.params.product_id;
  
      try {
        const product = await this.Product.findById(productId);
        res.json({ product, productId });
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    }

}
  
export const productsController = new ProductsController();