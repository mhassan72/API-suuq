import { product_instance } from "../model/Product"; 
import { Request, Response } from 'express';

export default class ProductsController {
    
    async all(req: Request, res: Response): Promise<void>{
        const products : any = await product_instance.all()
        res.json({ products })
    }

}

export const products = new ProductsController()