import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761277664710 implements MigrationInterface {
    name = 'Init1761277664710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdBy\` \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedBy\` \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedBy\` \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`thumbnail\` \`thumbnail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`createdBy\` \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`updatedBy\` \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`deletedBy\` \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_654d6da35fcab12c3905725a416\``);
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_b13f7cccc3f49089b18b40b6bc0\``);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`content\` \`content\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`createdBy\` \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`updatedBy\` \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`deletedBy\` \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`course_id\` \`course_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_654d6da35fcab12c3905725a416\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_b13f7cccc3f49089b18b40b6bc0\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_b13f7cccc3f49089b18b40b6bc0\``);
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_654d6da35fcab12c3905725a416\``);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`course_id\` \`course_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`deletedBy\` \`deletedBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`updatedBy\` \`updatedBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`createdBy\` \`createdBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`content\` \`content\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_b13f7cccc3f49089b18b40b6bc0\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_654d6da35fcab12c3905725a416\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`deletedBy\` \`deletedBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`updatedBy\` \`updatedBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`createdBy\` \`createdBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`thumbnail\` \`thumbnail\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedBy\` \`deletedBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedBy\` \`updatedBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdBy\` \`createdBy\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
    }

}
