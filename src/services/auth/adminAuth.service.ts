import AppDataSource from "../../config/database.config";
import { RegisterAdminDTO } from "../../dtos/admin/registerAdmin.dto";
import AdminEntity, { ADMIN_ROLES } from "../../entities/admin/admin.entity";
import BcryptService from "../../utils/bcrypt.util";

export default class AdminAuthService {
  // user Table. (data)
  // table reference.

  constructor(
    private readonly adminRepository = AppDataSource.getRepository(AdminEntity)
  ) {}

  //TODO: Change password.
  //TODO: Update Profile.
  //TODO:  Agent(consultancy) is created by Admin.

  async registerAdmin(data: RegisterAdminDTO) {
    const admin = new AdminEntity();
    admin.email = data.email;

    const emailAlreadyExists = await this.adminRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (emailAlreadyExists) throw new Error("Email already exists");

    admin.password = await new BcryptService().hash(data.password);
    admin.role = ADMIN_ROLES.ROLE1;

    const { ["password"]: password, ...rest } = await admin.save();
    return rest;
  }
}
