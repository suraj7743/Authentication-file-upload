import { RegisterAdminDTO } from "./../../dtos/admin/registerAdmin.dto";
import {
  Body,
  Controller,
  Middlewares,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import UserAuthService from "../../services/auth/userAuth.service";
import * as express from "express";
import { Request, Response } from "tsoa";
import RequestValidator from "../../middlewares/requestValidator.middleware";
import { RegisterStudentDTO } from "../../dtos/auth/student/registerStudent.dto";
import { RegisterAgencyDTO } from "../../dtos/auth/agency/registerAgency.dto";
import AdminAuthService from "../../services/auth/adminAuth.service";
import { StudentLoginDTO } from "../../dtos/auth/student/studentLogin.dto";
import { AgentLoginDto } from "../../dtos/auth/agency/agentLogin.dto";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  constructor(
    private readonly userAuthService = new UserAuthService(),
    private readonly adminAuthService = new AdminAuthService()
  ) {
    super();
  }

  //login routes
  @Post("/login/student")
  @Middlewares(RequestValidator.validate(StudentLoginDTO))
  async login(@Body() body: StudentLoginDTO, @Query() token?: string) {
    const res = await this.userAuthService.loginStudent(body, token);
    return { success: true, token: res };
  }

  @Post("/login/agency")
  @Middlewares(RequestValidator.validate(StudentLoginDTO))
  async loginAgency(@Body() body: AgentLoginDto) {
    const res = await this.userAuthService.loginAgent(body);
    return { success: true, token: res };
  }

  // Register Routes
  @Post("/register/student")
  @Middlewares(RequestValidator.validate(RegisterStudentDTO))
  async registerStudent(
    @Body() body: RegisterStudentDTO,
    @Request() req: express.Request
  ) {
    const res = await this.userAuthService.registerStudent(body, req);
    return { success: true, data: res };
  }

  @Post("/register/agency")
  @Middlewares(RequestValidator.validate(RegisterAgencyDTO))
  async registerAgency(@Body() body: RegisterAgencyDTO) {
    const res = await this.userAuthService.registerAgency(body);
    return { success: true, data: res };
  }

  @Post("/register/admin")
  @Middlewares(RequestValidator.validate(RegisterAdminDTO))
  async registerAdmin(@Body() body: RegisterAdminDTO) {
    const res = await this.adminAuthService.registerAdmin(body);
    return { success: true, data: res };
  }
}
