import AppDataSource from "../config/database.config";
import MediaEntity from "../entities/media/media.entity";

import multer from "multer";
import * as fs from "fs";
import * as express from "express";
import UploadType from "../constants/enums/uploadType";
import * as path from "path";
import filecheck from "../utils/uploadExtensionCheck.util";
import UserEntity from "../entities/user/user.entity";

declare global {
  namespace Express {
    interface Request {
      generatedFilename?: any;
    }
  }
}

// FileService.ts or FileController.ts
function getDynamicDestination(
  req: express.Request,
  fieldname: string
): string {
  const user = req.user;
  const userType = req.user.userType; // Get user information from the request
  const userId = user.id;
  // Extract user ID

  // Construct a dynamic path based on the user's ID or any other criteria

  let dynamicPath;
  if (userType === "STUDENT") {
    dynamicPath = `src/public/uploads/${fieldname}/${userId}/`;
    fs.mkdirSync(dynamicPath, { recursive: true });
  } else {
    if (userType === "AGENT") {
      dynamicPath = `src/public/uploads/${fieldname}/${userId}/`;
      fs.mkdirSync(dynamicPath, { recursive: true });
    } else {
      dynamicPath = `src/public/uploads/${fieldname}/${userId}/`;
      fs.mkdirSync(dynamicPath, { recursive: true });
    }
  }

  return dynamicPath;
}

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    const filesize = Number(req.headers["content-length"]) - 200;
    const mediaType: any = files.fieldname;
    const extension = path.extname(files.originalname).toLocaleLowerCase();
    try {
      filecheck(mediaType, extension, filesize);
    } catch (error) {
      return cb(error as any, null as any);
    }

    if (!Object.values(UploadType).includes(mediaType)) {
      return cb(new Error("Invalid upload type ") as any, null as any);
    } else {
      cb(null, getDynamicDestination(req, mediaType)); // The directory where uploaded files will be stored
    }
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    req.generatedFilename = filename; // Use the original file name
    cb(null, filename);
  },
});

// file upload. (middleware, util)

export const upload = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const mediaRepo = AppDataSource.getRepository(MediaEntity);
  const userRepo = AppDataSource.getRepository(UserEntity);
  const multerFile = multer({ storage: storage }).any();
  multerFile(req, res, async (err) => {
    if (err) {
      next(err);
    } else {
      const user: any = await userRepo.findOne({ where: { id: req.user.id } });
      const mediatype: any = req.files;
      const newmedia = new MediaEntity();
      newmedia.mediaType = mediatype[0].fieldname;
      newmedia.mediaName = req.generatedFilename;
      newmedia.user = user;
      newmedia.mimeType = mediatype[0].mimetype;
      await MediaEntity.save(newmedia);
      next();
    }
  });
};
