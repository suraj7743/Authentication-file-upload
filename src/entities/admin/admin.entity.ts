import { BaseEntity, Column, Entity } from "typeorm";
import CommonEntity from "../common/common.entity";

export enum ADMIN_ROLES {
  ROLE1 = "ROLE_1",
}

@Entity("admin")
export default class AdminEntity extends CommonEntity {
  @Column({ name: "email", type: "varchar", length: "50", unique: true })
  email: string;

  @Column({ name: "password", type: "text", select: false })
  password: string;

  @Column({
    name: "role",
    type: "enum",
    enum: ADMIN_ROLES,
    default: ADMIN_ROLES.ROLE1,
  })
  role: ADMIN_ROLES;
}

// TYPEORM => soft remove/delete, remove
// created_at, deleted_at (12312323123), updated_at
