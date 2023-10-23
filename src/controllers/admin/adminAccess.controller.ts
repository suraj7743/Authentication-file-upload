import AdminAccessService from "../../services/admin/AdminAccessService";
import * as express from "express";
import {
  Controller,
  Route,
  Request,
  Get,
  Tags,
  Middlewares,
  Put,
  Delete,
  Security,
  Path,
} from "tsoa";
import RequestValidator from "../../middlewares/requestValidator.middleware";
import { expressAuthentication } from "../../middlewares/jwtvalidate.middleware";
import UpdateAgentDto from "../../dtos/user/agent/updateAgentProfile.dto";
import { UpdateStudentDTO } from "../../dtos/user/student/updateStudentProfile.dto";

@Route("user")
@Security("jwt")
@Tags("AdminAccess")
export class UserController extends Controller {
  constructor(private readonly adminAccessService = new AdminAccessService()) {
    super();
  }

  @Get("/getStudent")
  async getUserStudent() {
    return this.adminAccessService.getUserStudent();
  }

  @Get("/getAgency")
  async getUserAgency() {
    return this.adminAccessService.getUserAgent();
  }

  @Get("/getOneStudent/:id")
  async getOneStudent(@Path() id: string) {
    return await this.adminAccessService.getOneStudent(id);
  }

  @Get("/getOneAgent/:id")
  async getOneAgent(@Request() req: express.Request) {
    return await this.adminAccessService.getOneAgent(req.params.id);
  }
  @Put("/updateAgent/:id")
  @Middlewares(RequestValidator.validate(UpdateAgentDto))
  async updateAgentProfile(@Request() req: express.Request) {
    return await this.adminAccessService.updateAgentProfile(
      req.params.id,
      req.body
    );
  }
  @Put("/updateStudent/:id")
  @Middlewares(RequestValidator.validate(UpdateStudentDTO))
  async updateStudnetProfile(@Request() req: express.Request) {
    return await this.adminAccessService.updateStudentProfile(
      req.params.id,
      req.body
    );
  }

  @Delete("/deleteAgent/:id")
  async deleteAgent(@Request() req: express.Request) {
    return await this.adminAccessService.deleteAgent(req.params.id);
  }
  @Delete("/deleteStudent/:id")
  async deleteStudent(@Request() req: express.Request) {
    return await this.adminAccessService.deleteStudent(req.params.id);
  }
}

//route=>controller=>services=>entities=>DB
