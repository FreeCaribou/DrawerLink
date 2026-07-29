import { Argument } from '@/types';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Form } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toastError } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';

export default function DialogDeleteArgument({
    argument,
    argumentTopicId
}: {
    argument: Argument;
    argumentTopicId: number;
}) {
    const { t } = useTranslation();
    const [openDialogDeleteArgument, setOpenDialogDeleteArgument] = useState(false);

    const handleSuccessDeleteArgument = () => {
        setOpenDialogDeleteArgument(false);
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    return (
        <Dialog open={openDialogDeleteArgument} onOpenChange={setOpenDialogDeleteArgument}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="cursor-pointer ml-5 rounded-full">
                    <Trash2Icon></Trash2Icon>
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{t('deleteSur')}</DialogTitle>
                    <DialogDescription>{t('deleteSurDescription')}</DialogDescription>
                </DialogHeader>
                <Form action={"/arguments/" + argumentTopicId + '/argument/' + argument.id} method="delete" onSuccess={handleSuccessDeleteArgument} onError={handleError}>
                    <Button
                        type="submit"
                        variant="destructive"
                        className="cursor-pointer"
                    >
                        <Trash2Icon></Trash2Icon>
                        {t('yes')}
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
