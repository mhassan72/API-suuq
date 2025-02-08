import { Request, Response } from 'express';
import Product from "../model/Product"; 
import Favourite from '../model/Favourite';


export default class ProductsController {
    private Product: Product;
    private Favourite: any;
  
    constructor() {
      this.Product = new Product();
      this.Favourite = new Favourite();
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
        const favourites = await this.Favourite.getFavouritesByProduct(productId);
        res.json({ product, productId , hearts: favourites.length });
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    }

}
  
export const productsController = new ProductsController();