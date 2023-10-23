import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export default class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
