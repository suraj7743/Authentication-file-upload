import AppDataSource from "../../../config/database.config";
import UserEntity, { USER_TYPE } from "../../../entities/user/user.entity";
import UserDetailsEntity from "../../../entities/user/userDetails.entity";
import AdminAccessService from "../../admin/AdminAccessService";

export default class StudentService {
  constructor(
    private readonly userDetailsRepository = AppDataSource.getRepository(
      UserDetailsEntity
    ),
    private readonly userRepo = AppDataSource.getRepository(UserEntity)
  ) {}
}
