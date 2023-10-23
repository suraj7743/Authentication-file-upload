import { Controller, Get, Route, Request, Security } from "tsoa";
import { expressAuthentication } from "../../../middlewares/jwtvalidate.middleware";
import UserCommonService from "../../../services/user/common/userCommon.service";

@Route("/")
export class UserCommonController extends Controller {
  constructor(private readonly userCommon = new UserCommonService()) {
    super();
  }
  @Get("me")
  @Security("jwt")
  async getMyProfile(@Request() req: Express.Request) {
    return this.userCommon.getMe(req);
  }
}
