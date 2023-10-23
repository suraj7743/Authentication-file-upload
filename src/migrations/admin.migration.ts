import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminChange1696005866458 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin" ADD COLUMN name varchar(50)`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN name`); // reverts things made in "up" method
  }
}
