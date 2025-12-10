import { dashboard, login, logout, register } from '@/routes';
import { FlashProps, SavedLink, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
    savedLinks = [],
    flash = {},
}: {
    canRegister?: boolean;
    savedLinks: SavedLink[];
    flash: FlashProps;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <Link
                            href={logout()}
                            className="cursor-pointer inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Log out
                        </Link>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-[335px] lg:max-w-4xl lg:flex-row">
                        {flash?.success && (
                            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                                {flash.success}
                            </div>
                        )}
                        <h1>The saved links</h1>
                        <u>
                            {savedLinks.map((link) => (
                                <li key={link.id} className="mb-1">
                                    {link.label}
                                </li>
                            ))}
                        </u>
                        <Form action="/saved-links" method='post' resetOnSuccess={['label']} className="flex gap-2">
                            <input
                                type="text"
                                name="label"
                                placeholder="New link label"
                                className="border rounded px-3 py-2 flex-1"
                            />
                            <button
                                type="submit"
                                className="bg-primary px-4 py-2 rounded cursor-pointer"
                            >
                                Add
                            </button>
                        </Form>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
