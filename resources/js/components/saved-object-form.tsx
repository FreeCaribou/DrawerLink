import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';

export default function SavedObjectForm({
    savedLinkId,
}: {
    savedLinkId: number,
}) {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [fileToBig, setFileToBig] = useState(false);

    /**
     * To reset the dropdown and some tricky field
     */
    const handleSuccess = () => {
        setOpenDialog(false);
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    const handleFileChange = (e: any) => {
        const file = e?.target?.files[0];
        if (file && file.size > 25 * 1024 * 1024) { // 25 Mo en octets
            setFileToBig(true);
        } else {
            setFileToBig(false);
        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="secondary">{t(('addFile'))}</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{t(('addFile'))}</DialogTitle>
                </DialogHeader>
                <Form
                    action={"/saved-links/" + savedLinkId + "/saved-object"}
                    method='post'
                    onSuccess={handleSuccess}
                    onError={handleError}
                    resetOnSuccess={['file']}
                    className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[66vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="link-form-file" className='text-secondary'>
                                    {t('form.fileLink')}
                                </FieldLabel>
                                <Input id="link-form-file" name='file' onChange={handleFileChange} type='file' />
                                <small className="text-secondary block mt-1">
                                    {t('form.maxFileSize', { size: '25 Mo' })}
                                </small>
                                {fileToBig && <p className="text-red-500 text-sm mt-1">{t('form.fileToBig')}</p>}
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline"> {t('cancel')}</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="cursor-pointer"
                            >
                                {t('add')}
                            </Button>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}