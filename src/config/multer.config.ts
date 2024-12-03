import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';


export const multerConfig = (): MulterOptions => ({
  storage: diskStorage({
    destination: './uploads/events', 
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueSuffix);
    },
  }),
});
