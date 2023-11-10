import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionMigratioon1699623839528 implements MigrationInterface {
    name = 'AddDescriptionMigratioon1699623839528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "details" TO "descriptions"`);
        await queryRunner.query(`ALTER TABLE "coffee" ALTER COLUMN "descriptions" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ALTER COLUMN "descriptions" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "descriptions" TO "details"`);
    }

}
