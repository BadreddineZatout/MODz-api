import { diskStorage } from 'multer';

export const getStorageConfig = (path: string) => {
  return diskStorage({
    destination: path,
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniquePrefix + '-' + file.originalname);
    },
  });
};
