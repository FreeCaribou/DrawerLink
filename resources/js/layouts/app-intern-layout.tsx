import { logout } from "@/routes";
import { Link } from "@inertiajs/react";

export default function AppInternLayout({
    children,
    ...props
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            <header className="mb-6 w-full text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-between w-full">
                    <Link href="/"><h1 className="m-0!">Drawer Link</h1></Link>
                    <Link
                        href={logout()}
                        className="cursor-pointer inline-block rounded-sm border border-foreground px-5 py-1.5 text-sm"
                    >
                        Log out
                    </Link>
                </nav>
            </header>
            <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <main className="w-full  lg:max-w-4xl lg:flex-row">
                    {children}
                </main>
            </div>
        </div>
    );
}
