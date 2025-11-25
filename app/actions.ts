'use server'

import { AppDataSource } from "@/database/data-source";
import { SavedLink } from "@/entities/SavedLink.entity";
import { refresh } from "next/cache";

export async function createLink(formData: FormData) {
    const label = formData.get('label')?.toString();
    console.log('actuion - create link', label)

    // TODO in a service !
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    if (label) {
        let savedLink = new SavedLink();
        savedLink.label = label;
        await AppDataSource.getRepository(SavedLink).save(savedLink);
    }

    refresh();
}
