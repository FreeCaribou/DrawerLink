import AddLinkForm from "@/components/add-link-form";
import LinkList from "@/components/link-list";
import { AppDataSource } from "@/database/data-source";
import { SavedLink } from "@/entities/SavedLink.entity";
import { List } from "@mantine/core";

export default async function Home() {

  // TODO in a service !
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const savedLinks = await AppDataSource.getRepository(SavedLink).find();
  console.log('saved links', savedLinks)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white sm:items-start">
        <h1 className="mb-5 text-primary text-xl">Drawer Link - Hello World</h1>
        <div className="mb-5">
          <h2 className="text-secondary">The links</h2>
          <LinkList savedLinks={savedLinks.map(sl => ({ id: sl.id, label: sl.label }))}></LinkList>
        </div>
        <AddLinkForm></AddLinkForm>
      </main>
    </div>
  );
}
