import { Request, Response } from 'express';
import { StorageService } from '../services/StorageService';
import  type { UploadResult } from '../types'

export class StoreController {
  private storageService: StorageService;

  constructor() {
    this.storageService = new StorageService();
  }

  public async uploadMedia(req: Request, res: Response): Promise<void> {
    try {
        if (!req.files || !Array.isArray(req.files)) {
            res.status(400).json({ error: 'No files uploaded' });
            return;
          }
      
          const files = req.files as Express.Multer.File[];
          const uploadResults: UploadResult[] = [];
      
          for (const file of files) {
            try {
              let result: UploadResult;
              
              if (file.mimetype.startsWith('image/')) {
                result = await this.storageService.uploadImage(file);
              } else if (file.mimetype.startsWith('video/')) {
                result = await this.storageService.uploadVideo(file);
              } else {
                throw new Error(`Unsupported file type: ${file.mimetype}`);
              }
      
              uploadResults.push(result);
            } catch (error) {
              uploadResults.push({
                originalname: file.originalname,
                error: (error as Error).message,
                // Optional: Add default values for other fields
                url: '',
                key: '',
                mimetype: '',
                size: 0
              });
            }
          }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Upload error:', errorMessage);
      
      res.status(500).json({
        error: 'Failed to process upload',
        details: errorMessage
      });
    }
  };
}

export  const  storeController = new StoreController()
