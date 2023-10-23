import HttpException from "../utils/httpException.util";
import { Message } from "../constants/message.constant";
import jwtUtil from "../utils/jwt.util";
import EnvConfiguration from "../config/env.config";
import AppDataSource from "../config/database.config";
import UserEntity from "../entities/user/user.entity";
import * as express from "express";
import { error } from "console";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  try {
    if (securityName === "jwt") {
      request.user = await jwtvalidate(request);
      return request.user;
    } else {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function jwtvalidate(req: express.Request) {
  const userRepo = AppDataSource.getRepository(UserEntity);
  try {
    //1 if token exists or not
    let token: any = req.headers.authorization || "";
    if (
      !req.headers.authorization &&
      !req.headers.authorization?.startsWith("Bearer")
    ) {
      throw new Error(Message.unAuthorized);
    }
    token = req.headers.authorization?.split(" ")[1];

    //2 verify token
    const decoded = jwtUtil.verify(token, EnvConfiguration.JWT_SECRET);
    //3 check if user still exists
    const userExists = await userRepo.findOneBy({ id: decoded.id });
    if (!userExists) {
      throw new Error("user Doesnot exists ");
    }
    //4 check whether password is changed or not after token is initialized
    const dbDate = userExists?.updated_at.getTime() || 0;
    if (dbDate / 1000 > decoded.exp) {
      throw new Error("password changed .Login again ");
    }
    return userExists;
  } catch (error) {
    throw error;
  }
}
