// File to reset and seed the database

require("reflect-metadata");
const { AppDataSourceMigration } = require("./data-source-migration");
const { SavedLink } = require("../entities/SavedLink.entity");
const { User } = require("../entities/User.entity");

async function seed() {

    if (!AppDataSourceMigration.isInitialized) {
        await AppDataSourceMigration.initialize();
    }

    const savedLinkRepo = AppDataSourceMigration.getRepository(SavedLink);
    const userRepo = AppDataSourceMigration.getRepository(User);

    console.info("Deleting current data");
    await savedLinkRepo.deleteAll();
    await userRepo.deleteAll();
    // Truncat the table saved link
    await AppDataSourceMigration.query(`TRUNCATE TABLE "saved_link" RESTART IDENTITY CASCADE`);
    await AppDataSourceMigration.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);

    console.info("Mock new data");
    const firstSavedLink = { label: 'Amazing newspaper article', link: 'www.lolmag.com' };
    const secondSavedLink = { label: 'You will never believe it !', link: 'www.dontbelieveme.com' };
    await savedLinkRepo.save([firstSavedLink, secondSavedLink]);

    const simpleUser = new User();
    simpleUser.username = "freecaribou";
    simpleUser.password = "qwertz";
    const otherSimpleUser = new User();
    otherSimpleUser.username = "bob";
    otherSimpleUser.password = "dorvak";
    await userRepo.save([simpleUser, otherSimpleUser]);

    console.info("Seed done");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
