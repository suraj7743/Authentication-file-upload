import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import CommonEntity from "../common/common.entity";
import UserEntity from "./user.entity";
import { IsOptional } from "class-validator";

@Entity("user_details")
export default class UserDetailsEntity extends CommonEntity {
  @Column({
    name: "student_first_name",
    type: "varchar",
    length: "20",
    nullable: true,
  })
  studentFirstName: string;

  @Column({
    name: "student_middle_name",
    type: "varchar",
    length: "20",
    nullable: true,
  })
  studentMiddleName: string;

  @Column({
    name: "student_last_name",
    type: "varchar",
    length: "20",
    nullable: true,
  })
  studentLastName: string;

  @Column({
    name: "agency_name",
    type: "varchar",
    length: "200",
    nullable: true,
  })
  agencyName: string;

  @Column({ name: "location", type: "varchar", length: 200, nullable: true })
  location: string;

  @Column({ name: "pan_vat_no", type: "varchar", length: "40", nullable: true })
  panVatNo: string;

  @Column({ name: "owner_name", type: "varchar", length: "40", nullable: true })
  agencyOwnerName: string;

  @Column({
    name: "contact_number",
    type: "varchar",
    length: "15",
    nullable: true,
  })
  contactNumber: string;

  @Column({ name: "student_agent_details_id", nullable: true, type: "varchar" })
  studentAgentDetailsId: string;

  @OneToOne(() => UserEntity, (user) => user.userDetails, {
    cascade: ["soft-remove", "update", "remove"],
    eager: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: UserEntity;
}
