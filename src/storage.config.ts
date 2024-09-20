import * as path from 'path';
import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}${path.extname(file.originalname)}`;
}
