import { Argument } from '@/types';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Form } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toastError } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import { Spinner } from './ui/spinner';

export default function DialogDeleteArgument({
    argument,
    argumentTopicId
}: {
    argument: Argument;
    argumentTopicId: number;
}) {
    const { t } = useTranslation();
    const [openDialogDeleteArgument, setOpenDialogDeleteArgument] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccessDeleteArgument = () => {
        setOpenDialogDeleteArgument(false);
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        toastError(err);
        setIsLoading(false);
    }

    return (
        <Dialog open={openDialogDeleteArgument} onOpenChange={setOpenDialogDeleteArgument}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="cursor-pointer ml-5 rounded-full" disabled={isLoading}>
                    {isLoading ? <Spinner /> : <Trash2Icon />}
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{t('deleteSur')}</DialogTitle>
                    <DialogDescription>{t('deleteSurDescription')}</DialogDescription>
                </DialogHeader>
                <Form action={"/arguments/" + argumentTopicId + '/argument/' + argument.id} method="delete"
                    onSuccess={handleSuccessDeleteArgument} onError={handleError} onBefore={() => setIsLoading(true)}>
                    <Button
                        type="submit"
                        variant="destructive"
                        className="cursor-pointer"
                        disabled={isLoading}
                    >
                        {t('yes')}
                        {isLoading ? <Spinner /> : <Trash2Icon />}
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
