import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import type { UploadResult } from '../types';

export class StorageService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.bucketName = process.env.S3_BUCKET_NAME!;
  }

  private async uploadFile(
    buffer: Buffer, 
    mimetype: string, 
    folder: string,
    originalname: string // Add originalname parameter
  ): Promise<UploadResult> {
    const key = `${folder}/${uuidv4()}-${Date.now()}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    });
  
    await this.s3Client.send(command);
  
    return {
      originalname, // Include in return object
      url: `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      key,
      mimetype,
      size: buffer.length,
    };
  }
  
  async uploadImage(file: Express.Multer.File): Promise<UploadResult> {
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Invalid image file type');
    }
    return this.uploadFile(
      file.buffer,
      file.mimetype,
      'images',
      file.originalname
    );
  }
  
  async uploadVideo(file: Express.Multer.File): Promise<UploadResult> {
    if (!file.mimetype.startsWith('video/')) {
      throw new Error('Invalid video file type');
    }
    return this.uploadFile(
      file.buffer,
      file.mimetype,
      'videos',
      file.originalname
    );
  }
}