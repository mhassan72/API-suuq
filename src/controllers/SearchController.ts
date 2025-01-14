import { Request, Response } from 'express';
import { searchService } from '../services/Search'

class SearchController {

    async search (req: Request, res: Response): Promise<void> {
        res.json(await searchService.products(req.params.search_term))
    }

}

export const searchController = new SearchController()