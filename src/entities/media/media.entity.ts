import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import CommonEntity from "../common/common.entity";
import UploadType from "../../constants/enums/uploadType";
import UserEntity, { USER_TYPE } from "../user/user.entity";
import EnvConfiguration from "../../config/env.config";

@Entity("media")
export default class MediaEntity extends CommonEntity {
  @Column({ name: "media_type", enum: UploadType, type: "enum" })
  mediaType: UploadType;

  // @Column({ name: "media_user" })
  // mediaUser: string;

  @Column({ type: "varchar", name: "media_name" })
  mediaName: string;

  @Column({ name: "mime_type" })
  mimeType: string;

  @ManyToOne(
    () => UserEntity,
    (user) => {
      user.media;
    },
    {
      nullable: true,
      cascade: true,
    }
  )
  @JoinColumn({ name: "user_Id" })
  user: UserEntity;
  // random-key+a.trim()

  // a.jpg

  // public/temp
  // if not error : public/temp move public/uploads/student-id/document/
  // Server cronjob. (30 din clean.)

  @AfterLoad()
  filepathname() {
    this.mediaName = `${process.cwd()}/src/public/uploads/${this.mediaType}/${
      this.user.id
    }/${this.mediaName}`;
  }
}
