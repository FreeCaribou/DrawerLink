import { logout } from '@/routes';
import { Draw, FlashProps, SavedLink, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import SavedLinkList from '@/components/saved-link-list';
import DrawerForm from '@/components/drawer-form';
import SavedLinkForm from '@/components/saved-link-form';

export default function Welcome({
    savedLinks = [],
    drawBaseList = [],
    flash = {},
}: {
    savedLinks: SavedLink[];
    drawBaseList: Draw[];
    flash: FlashProps;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end">
                        <Link
                            href={logout()}
                            className="cursor-pointer inline-block rounded-sm border border-foreground px-5 py-1.5 text-sm"
                        >
                            Log out
                        </Link>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-[335px] lg:max-w-4xl lg:flex-row">

                        {flash?.success && (
                            <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
                                {flash.success}
                            </div>
                        )}

                        <SavedLinkList savedLinks={savedLinks} />

                        <div className='mt-6'>
                            <SavedLinkForm drawBaseList={drawBaseList} />
                        </div>

                        <div className='mt-6'>
                            <DrawerForm />
                        </div>

                    </main>
                </div>
            </div>
        </>
    );
}
