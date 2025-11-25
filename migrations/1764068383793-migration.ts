import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764068383793 implements MigrationInterface {
    name = 'Migration1764068383793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saved_link" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_2e8c9cf10927e8ca5ba7b0db5be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "saved_link"`);
    }

}
