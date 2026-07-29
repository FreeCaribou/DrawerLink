import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { type PropsWithChildren } from 'react';
import Footer from '../footer';
import { useTranslation } from 'react-i18next';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    const { t } = useTranslation();
    return (
        <div className="flex min-h-svh flex-col items-center align-middle bg-muted">
            <div className="flex-[100] flex max-w-md flex-col p-6 justify-center">
                <div className="flex flex-col">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <h1>Drawer Link</h1>
                            <CardTitle className="text-xl text-primary">{t('login')}</CardTitle>
                            <CardDescription className='text-secondary'>{t('welcomeLogin')}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">
                            {children}
                        </CardContent>
                        <CardFooter>
                            <p className='text-secondary'>{t('noAccount')}</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
