import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDetailsColumnMigration1699148312595 implements MigrationInterface {
    name = 'AddDetailsColumnMigration1699148312595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "details" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "details"`);
    }

}
