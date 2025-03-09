import { Request, Response } from 'express';
import Product from '../model/Product';

export default class HomeController {

  constructor() {
      this.browse = this.browse.bind(this);
    }

  async home(req: Request, res: Response) {
    res.json({
      "msg": "Macmiil ku soo dhawow API-ga Suuq.io",
      "timeStamp": new Date().getTime(),
    });
  }

  async browse(req: Request, res: Response) {
    try {
      const productModel = new Product();

      // Fetch all products
      const products = await productModel.all();

      // Group products by category while removing duplicates
      const groupedProducts: Record<string, any[]> = {};

      products.forEach(product => {
          const category = product.category || "Uncategorized"; // Default category

          if (!groupedProducts[category]) {
              groupedProducts[category] = [];
          }

          // Avoid duplicate products based on ID
          if (!groupedProducts[category].some(p => p.id === product.id)) {
              groupedProducts[category].push(product);
          }
      });

      // Format the response based on the Response Template
      const formattedGroups = Object.entries(groupedProducts).map(([category, items]) => [
          {
              type: "overview",
              name: category,
              count: items.length
          },
          ...items.map(product => ({
              type: "product",
              ...product
          }))
      ]);

      res.json({
          status: res.statusCode,
          groups: formattedGroups
      });

  } catch (error) {
      console.error("Error in browse:", error);
      res.status(500).json({ status: 500, error: "Failed to fetch products" });
  }
  }


}


export const home = new HomeController();