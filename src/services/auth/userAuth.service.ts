import { RegisterAgencyDTO } from "../../dtos/auth/agency/registerAgency.dto";
import AppDataSource from "../../config/database.config";
import { RegisterStudentDTO } from "../../dtos/auth/student/registerStudent.dto";
import UserEntity, {
  USER_STATUS,
  USER_TYPE,
} from "../../entities/user/user.entity";
import BcryptService from "../../utils/bcrypt.util";
import UserDetailsEntity from "../../entities/user/userDetails.entity";
import { StudentLoginDTO } from "../../dtos/auth/student/studentLogin.dto";
import jwtUtil from "../../utils/jwt.util";
import EnvConfiguration from "../../config/env.config";
import { AgentLoginDto } from "../../dtos/auth/agency/agentLogin.dto";
import EmailService from "../email/mail.service";

export default class UserAuthService {
  // user Table. (data)
  // table reference.

  constructor(
    private readonly userRepository = AppDataSource.getRepository(UserEntity),
    private readonly userDetailsRepository = AppDataSource.getRepository(
      UserDetailsEntity
    )
  ) {}

  async loginStudent(data: StudentLoginDTO, token?: any) {
    try {
      const student = await this.userRepository.findOne({
        where: {
          email: data.email,
          userType: USER_TYPE.STUDENT,
        },
      });

      if (!student) throw new Error("Student doesnot exist");

      if (student.emailVerified === false) {
        jwtUtil.verify(token, EnvConfiguration.JWT_MAIL_SECRET);
        await this.userRepository.update(
          { id: student.id },
          { emailVerified: true }
        );
      }
      if (student.userStatus === USER_STATUS.UNDER_REVIEW) {
        throw new Error("Account not verified ");
      }

      const isMatched = await new BcryptService().compare(
        data.password,
        student.password
      );

      if (!isMatched) throw new Error("Invalid Credentails");

      //Login

      return await jwtUtil.sign(
        { id: student.id.toString(), email: student.email },
        {
          secret: EnvConfiguration.JWT_SECRET,
          expiresIn: EnvConfiguration.JWT_TOKEN_EXPIRY,
        },
        undefined,
        USER_TYPE.STUDENT
      );
    } catch (error) {
      throw error;
    }
  }

  async loginAgent(data: AgentLoginDto) {
    const agent = await this.userRepository.findOne({
      where: {
        email: data.email,
        userType: USER_TYPE.AGENCY,
      },
    });

    if (!agent) throw new Error("Agent doesnot exist");

    const isMatched = await new BcryptService().compare(
      data.password,
      agent.password
    );

    if (!isMatched) throw new Error("Invalid Credentails");

    //Login

    return await jwtUtil.sign(
      { id: agent.id.toString(), email: agent.email },
      {
        secret: EnvConfiguration.JWT_SECRET,
        expiresIn: EnvConfiguration.JWT_TOKEN_EXPIRY,
      },
      undefined,
      USER_TYPE.AGENCY
    );
  }
  //Register route
  async registerStudent(data: RegisterStudentDTO, req: any) {
    const user = new UserEntity();
    user.email = data.email;

    const emailAlreadyExists = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    //check whether agent exist or not
    const agentExist = await this.userDetailsRepository.findOne({
      where: { id: data.studentAgentDetailsId },
    });
    if (!agentExist) {
      throw new Error("Agent doesn't exist enter valid agent id ");
    }

    if (emailAlreadyExists) throw new Error("Email already exists");

    user.password = await new BcryptService().hash(data.password);

    // Default value for newly registered student.
    user.userType = USER_TYPE.STUDENT;
    user.userStatus = USER_STATUS.UNDER_REVIEW;
    const newUser = await user.save();

    const userDetailsEntity = new UserDetailsEntity();
    userDetailsEntity.contactNumber = data.contactNumber;
    userDetailsEntity.studentFirstName = data.studentFirstName;
    userDetailsEntity.studentLastName = data.studentLastName;
    userDetailsEntity.studentLastName = data.studentLastName;
    userDetailsEntity.location = data.location;
    userDetailsEntity.studentAgentDetailsId = data.studentAgentDetailsId;

    userDetailsEntity.user = newUser;
    //token for mail verification
    let token = jwtUtil.sign(
      { id: "", email: "" },
      {
        secret: EnvConfiguration.JWT_MAIL_SECRET,
        expiresIn: EnvConfiguration.JWT_MAIL_EXPIRY,
      },
      undefined,
      undefined
    );
    try {
      const url = `${req.protocol}://${req.get(
        "host"
      )}/auth/login/student?token=${token}`;
      EmailService.sendmail(
        data.email,
        "Mail verification",
        "To verify your mail (valid for 10 min )",
        url
      );
      await userDetailsEntity.save();
      return {
        success: "true",
        message: "verfication mail sent check your email and proceed to login ",
      };
    } catch (error) {
      throw new Error("Error sending mail try again ");
    }
  }

  async registerAgency(data: RegisterAgencyDTO) {
    const user = new UserEntity();
    user.email = data.email;
    const emailAlreadyExists = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (emailAlreadyExists) {
      throw new Error("Email Already Exists");
    }

    user.password = await new BcryptService().hash(data.password);
    // Default value for newly registered agent.
    user.userType = USER_TYPE.AGENCY;
    user.userStatus = USER_STATUS.UNDER_REVIEW;

    const newUser = await user.save();

    const userDetailsEntity = new UserDetailsEntity();
    userDetailsEntity.agencyName = data.agencyName;
    userDetailsEntity.agencyOwnerName = data.agencyOwnerName;
    userDetailsEntity.contactNumber = data.contactNumber;
    userDetailsEntity.panVatNo = data.panVatNo;
    userDetailsEntity.location = data.location;

    userDetailsEntity.user = newUser;

    return await userDetailsEntity.save();
  }
}
