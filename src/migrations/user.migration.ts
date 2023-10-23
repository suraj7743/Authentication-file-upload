import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUser1696005866458 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN age varchar(50)`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN age`); // reverts things made in "up" method
  }
}
