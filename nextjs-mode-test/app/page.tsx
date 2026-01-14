import AddLinkForm from "@/components/add-link-form";
import LinkList from "@/components/link-list";
import { savedLinkService } from "@/services/saved-link.service";

export default async function Home() {

  const savedLinks = await savedLinkService.getAll();

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
