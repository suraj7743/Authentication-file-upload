import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CommonEntity from "../common/common.entity";
import UserDetailsEntity from "./userDetails.entity";
import BcryptService from "../../utils/bcrypt.util";
import MediaEntity from "../media/media.entity";

export enum USER_TYPE {
  STUDENT = "STUDENT",
  AGENCY = "AGENCY",
}

export enum USER_STATUS {
  UNDER_REVIEW = "UNDER_REVIEW",
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}
@Entity("user")
class UserEntity extends CommonEntity {
  @Column({ name: "email", type: "varchar", length: "50" })
  email: string;

  @Column({ name: "password", type: "text", select: false })
  password: string;

  @Column({ name: "user_type", type: "enum", enum: USER_TYPE })
  userType: USER_TYPE;

  // User Account Status.
  @Column({
    name: "status",
    type: "enum",
    enum: USER_STATUS,
    default: USER_STATUS.UNDER_REVIEW,
  })
  userStatus: USER_STATUS;

  // @OneToOne(()=>UserDetailsEntity, userDetails=>)
  @OneToOne(() => UserDetailsEntity, (userDetail) => userDetail.user)
  userDetails: UserDetailsEntity;

  @OneToMany(
    () => MediaEntity,
    (media) => {
      media.user;
    },
    { nullable: true }
  )
  media: MediaEntity[];

  @Column({ name: "email_verified", type: "boolean", default: false })
  emailVerified: boolean;
}

export default UserEntity;
