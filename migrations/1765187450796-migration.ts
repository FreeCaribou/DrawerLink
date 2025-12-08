import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765187450796 implements MigrationInterface {
    name = 'Migration1765187450796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_link" ADD "link" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "saved_link" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_link" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "saved_link" DROP COLUMN "link"`);
    }

}
