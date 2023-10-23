// FileService.ts
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

class FileService {
  public async uploadFile(file: Express.Multer.File): Promise<string> {
    // Perform any processing on the uploaded file here
    // For example, you could save file details to a database or perform other operations.

    return "File uploaded successfully";
  }
}

export default new FileService();
