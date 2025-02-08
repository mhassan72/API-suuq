// middleware/fileUpload.ts
import multer from 'multer';

// No unused StorageService import
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB limit
    files: 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
});

export const fileUploadMiddleware = upload.array('media');