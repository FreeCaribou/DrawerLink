import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765196004475 implements MigrationInterface {
    name = 'Migration1765196004475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saved_link" ALTER COLUMN "link" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_link" ALTER COLUMN "link" SET DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
