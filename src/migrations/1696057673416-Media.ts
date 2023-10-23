import { MigrationInterface, QueryRunner } from "typeorm";

export class Media1696057673416 implements MigrationInterface {
  name = "Media1696057673416";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "media_type" "public"."media_media_type_enum" NOT NULL, "media_name" character varying NOT NULL, "mime_type" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_0db866835bf356d896e1892635d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD column media_user varchar(50)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_0db866835bf356d896e1892635d"`
    );
    await queryRunner.query(`ALTER TABLE "media" DROP column media_user`);

    await queryRunner.query(`DROP TABLE "media"`);
  }
}
