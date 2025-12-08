import { AppDataSource } from "@/database/data-source";
import { SavedLink } from "@/entities/SavedLink.entity";

export const savedLinkService = {

    getAll: async (): Promise<SavedLink[]> => {
        await initAppDataSource();
        return AppDataSource.getRepository(SavedLink).find();
    },

    create: async (data: CreateLinkDto): Promise<SavedLink | null> => {
        await initAppDataSource();
        const repo = AppDataSource.getRepository(SavedLink);
        const savedLink = repo.create({
            label: data.label,
            link: data.link,
            description: data.description || '',
        });
        return await AppDataSource.getRepository(SavedLink).save(savedLink);
    }

};

async function initAppDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
};
