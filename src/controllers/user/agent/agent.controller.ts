import * as express from "express";
import {
  Controller,
  Get,
  Route,
  Request,
  Middlewares,
  Put,
  Security,
} from "tsoa";
import AgentService from "../../../services/user/agent/agent.service";
import { expressAuthentication } from "../../../middlewares/jwtvalidate.middleware";

@Route("/")
export class AgentController extends Controller {
  constructor(private readonly agentService = new AgentService()) {
    super();
  }

  @Get("/getAgentName")
  async getAgentName() {
    return this.agentService.getAgentName();
  }
  @Get("/studentOfAgent")
  @Security("jwt")
  async getStudentOfAgent(@Request() req: Express.Request) {
    return this.agentService.getStudentOfAgent(req);
  }

  @Put("/verifyStudent/:id")
  @Security("jwt")
  async VerifyStudent(@Request() req: express.Request) {
    return this.agentService.studentVerified(req.params.id, req.user.id);
  }
}
