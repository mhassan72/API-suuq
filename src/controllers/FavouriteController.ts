import { Request, Response } from 'express';
import Favourite from '../model/Favourite';
// import { FavouriteItem } from '../types';
import { DatabaseError, NotFoundError } from '../errors';

export default class FavouriteController {
  private model: any;

  constructor() {
    this.model = new Favourite();
    this.addToFavourites = this.addToFavourites.bind(this)
    this.list = this.list.bind(this)
    this.remove = this.remove.bind(this)
  }

  async addToFavourites(req: Request, res: Response) : Promise<void> {
    const id = await this.model.generateId(req.body.productID,req.body.userId);
    
    const favouriteItem: any = {
      id,
      productId: req.body.productID,
      userId: req.body.userId,
      createdAt: new Date().toISOString(),
    };

    try {  
      await this.model.create(favouriteItem);

      res.status(200).json({ msg: "Hello world", favouriteItem });
    } catch (error: any) {
      res.status(400).json({ msg: error.message, favouriteItem})
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    try {
      const result = await this.model.removeFavorite(id);
      res.status(200).json({
        success: true,
        message: 'Successfully removed from favorites',
        data: result
      });
      
    } catch (error: any) {
      if (error) {
        res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Unexpected server error'
        });
      }
    }
  }

  async list(req: Request, res: Response) : Promise<void> {
    const { userId } = req.params; // Extract userId from URL
    try {
      // const favourites = await this.model.getFavouritesByUser(userId);
      const favourites = await this.model.getFavouritesByUser(userId)
      res.json(favourites); // Return list of favourites
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  
}

export const favouriteController = new FavouriteController();