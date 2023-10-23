import { Controller, Middlewares, Post, Route, Security, Request } from "tsoa";
import * as express from "express";
import { upload } from "../../middlewares/mediaUploadMulterMiddleware";
import { Message } from "../../constants/message.constant";
import AppDataSource from "../../config/database.config";
import MediaEntity from "../../entities/media/media.entity";

@Route("/api/media")
export class MediaController extends Controller {
  constructor(private meadiaRepo = AppDataSource.getRepository(MediaEntity)) {
    super();
  }
  @Post("/")
  @Security("jwt")
  @Middlewares(upload)
  async fileUpload(@Request() req: Express.Request) {
    const media = await this.meadiaRepo.findOneOrFail({
      where: { mediaName: req.generatedFilename },
      relations: ["user"],
    });
    return { success: Message.mediaUploaded, data: media };
  }
}
