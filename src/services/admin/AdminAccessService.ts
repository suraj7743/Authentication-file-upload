import AppDataSource from "../../config/database.config";
import UserEntity, { USER_TYPE } from "../../entities/user/user.entity";
import UserDetailsEntity from "../../entities/user/userDetails.entity";
import UpdateAgentDto from "../../dtos/user/agent/updateAgentProfile.dto";
import BcryptService from "../../utils/bcrypt.util";
import { UpdateStudentDTO } from "../../dtos/user/student/updateStudentProfile.dto";
import MediaEntity from "../../entities/media/media.entity";

export default class AdminAccessService {
  // user Table. (data)
  // table refernce.
  constructor(
    private readonly userRepository = AppDataSource.getRepository(UserEntity),
    private readonly userDetailsRepository = AppDataSource.getRepository(
      UserDetailsEntity
    ),
    private readonly mediaRepository = AppDataSource.getRepository(MediaEntity)
  ) {}
  //only for admin
  async getAllUser() {
    const userDetails = await this.userDetailsRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .getMany();

    return userDetails;
  }

  async getUserStudent() {
    const userDetails = await this.userDetailsRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .where("user.user_type=:userType", { userType: USER_TYPE.STUDENT })
      .getMany();

    return userDetails;
  }

  async getUserAgent() {
    const alluserDetails = await this.userDetailsRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .where("user.user_type=:userType", { userType: USER_TYPE.AGENCY })
      .getMany();

    return alluserDetails;
  }

  async getOneStudent(id: string) {
    try {
      const userDetails = await this.userDetailsRepository
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.user", "user")
        .where("u.id=:id", { id: id })
        .andWhere("user.user_type=:userType", { userType: USER_TYPE.STUDENT })
        .getOneOrFail();

      const media: any = await this.mediaRepository
        .createQueryBuilder("m")
        .select(["m.id", "m.media_name", "m.media_type"])
        .leftJoinAndSelect("m.user", "user")
        .where("m.user_Id=:userId", {
          userId: userDetails.user.id,
        })
        .getMany();
      return { userDetails, media };
    } catch (error) {
      throw Error(`Cannot find student with the given id Wrong id:\n${error} `);
    }
  }

  async getOneAgent(id: string) {
    const userDetails = await this.userDetailsRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.user", "user")
      .where("u.id=:id", { id: id })
      .andWhere("user.user_type=:userType", { userType: USER_TYPE.AGENCY })
      .getOneOrFail();

    const media: any = await this.mediaRepository
      .createQueryBuilder("m")
      .select(["m.id", "m.media_name", "m.media_type"])
      .leftJoinAndSelect("m.user", "user")
      .where("m.user_Id=:userId", {
        userId: userDetails.user.id,
      })
      .getMany();
    return { userDetails, media };
  }

  async updateAgentProfile(id: string, resp: UpdateAgentDto) {
    const hashPassword = await new BcryptService().hash(resp.password);
    const updateuser: any = await this.userDetailsRepository.findOne({
      where: { id: id, user: { userType: USER_TYPE.AGENCY } },
      relations: ["user"],
    });
    if (updateuser) {
      (updateuser.agencyName = resp.agencyName),
        (updateuser.agencyOwnerName = resp.agencyOwnerName),
        (updateuser.location = resp.location),
        (updateuser.contactNumber = resp.contactNumber),
        (updateuser.user.email = resp.email),
        (updateuser.user.password = hashPassword),
        (updateuser.panVatNo = resp.panVatNo);
    }
    return await this.userDetailsRepository.save(updateuser);
  }

  async updateStudentProfile(id: string, resp: UpdateStudentDTO) {
    const hashPassword = await new BcryptService().hash(resp.password);
    const updateuser: any = await this.userDetailsRepository.findOne({
      where: { id: id, user: { userType: USER_TYPE.STUDENT } },
      relations: ["user"],
    });
    if (updateuser) {
      (updateuser.studentFirstName = resp.studentFirstName),
        (updateuser.studentLastName = resp.studentLastName),
        (updateuser.studentAgentDetailsId = resp.studentAgentDetailsId),
        (updateuser.studentMiddleName = resp.studentMiddleName),
        (updateuser.user.email = resp.email),
        (updateuser.user.password = hashPassword),
        (updateuser.location = resp.location),
        (updateuser.contactNumber = resp.contactNumber);
    }
    return await this.userDetailsRepository.save(updateuser);
  }

  async deleteAgent(id: string) {
    const user: any = await this.userDetailsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("User doesnot exist ");
    }
    const data = await this.userDetailsRepository.softDelete(id);
    if (data) {
      return { success: true, message: "Item deleted" };
    }
  }

  async deleteStudent(id: string) {
    const todelte: any = await this.userDetailsRepository.findOne({
      where: { id: id },
      relations: ["user"],
    });
    return await this.userDetailsRepository.softRemove(todelte);
  }
}
