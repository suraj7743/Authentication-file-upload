import jwt from "jsonwebtoken";
import { IJwtOptions, IJwtPayload } from "../interface/jwt.interface";
import env from "../config/env.config";
// import { Role } from "../constant/global";
import { USER_TYPE } from "../entities/user/user.entity";
import { ADMIN_ROLES } from "../entities/admin/admin.entity";

class WebTokenService {
  //admin, user
  sign(
    user: IJwtPayload,
    options: IJwtOptions,
    role?: ADMIN_ROLES,
    userType?: USER_TYPE
  ) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role,
      },
      options.secret,
      {
        expiresIn: options.expiresIn,
      }
    );
  }

  verify(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  //   generateAccessToken(
  //     user: IJwtPayload,
  //     userType?: USER_TYPE,
  //     role?: ADMIN_ROLES
  //   ) {
  //     return this.sign(
  //       user,
  //       {
  //         expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  //         secret: env.ACCESS_TOKEN_SECRET,
  //       },
  //       role
  //     );
  //   }

  //   generateTokens(user: IJwtPayload, role: Role) {
  //     const accessToken = this.sign(
  //       user,
  //       {
  //         expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  //         secret: env.ACCESS_TOKEN_SECRET,
  //       },
  //       role
  //     );

  // const refreshToken = this.sign(
  //   user,
  //   {
  //     expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  //     secret: env.REFRESH_TOKEN_SECRET,
  //   },
  //   role
  // );
  // return { accessToken };
  // }
}

export default new WebTokenService();
