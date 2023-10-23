import AppDataSource from "../../../config/database.config";
import UserDetailsEntity from "../../../entities/user/userDetails.entity";
import UserEntity, {
  USER_STATUS,
  USER_TYPE,
} from "../../../entities/user/user.entity";

export default class AgentService {
  constructor(
    private readonly userDetailsRepo = AppDataSource.getRepository(
      UserDetailsEntity
    ),
    private readonly userRepo = AppDataSource.getRepository(UserEntity)
  ) {}

  async getAgentName() {
    const data = await this.userDetailsRepo
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .select(["u.id", "u.agencyName"])
      .where("user.userType=:userType", { userType: USER_TYPE.AGENCY })
      .getMany();

    return data;
  }

  async getStudentOfAgent(req: Express.Request) {
    const data: any = await this.userDetailsRepo
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .select("u.id")
      .where("user.id=:id", { id: req.user.id })
      .getOne();
    const getStudentOfId = await this.userDetailsRepo
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .select()
      .where("u.student_agent_details_id=:id", { id: data.id })
      .getMany();
    return getStudentOfId;
  }
  async studentVerified(studentId: string, userId: string) {
    return await this.userRepo.update(
      { id: studentId },
      { userStatus: USER_STATUS.ACTIVE }
    );
  }
}
