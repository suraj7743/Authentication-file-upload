import AppDataSource from "../../../config/database.config";
import UserEntity, { USER_TYPE } from "../../../entities/user/user.entity";
import UserDetailsEntity from "../../../entities/user/userDetails.entity";
import AdminAccessService from "../../admin/AdminAccessService";

export default class UserCommonService {
  constructor(
    private readonly userDetailsRepository = AppDataSource.getRepository(
      UserDetailsEntity
    ),
    private readonly userRepo = AppDataSource.getRepository(UserEntity),
    private readonly adminAccessService = new AdminAccessService()
  ) {}

  async getMe(req: Express.Request) {
    const userDetailId: any = await this.userDetailsRepository
      .createQueryBuilder()
      .from(UserDetailsEntity, "u")
      .select("u.id")
      .where("u.user.id=:id", { id: req.user.id })
      .getOne();

    if (req.user.userType == USER_TYPE.STUDENT) {
      try {
        return await this.adminAccessService.getOneStudent(userDetailId.id);
      } catch (error) {
        throw error;
      }
    }
    if (req.user.userType === USER_TYPE.AGENCY) {
      return await this.adminAccessService.getOneAgent(userDetailId.id);
    } else {
      return {
        success: "false",
        message: "Invalid url or token try again ",
      };
    }
  }
}
