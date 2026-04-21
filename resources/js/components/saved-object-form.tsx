import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useTranslation } from 'react-i18next';

export default function SavedObjectForm({
    savedLinkId,
}: {
    savedLinkId: number,
}) {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * To reset the dropdown and some tricky field
     */
    const handleSuccess = () => {
        setOpenDialog(false);
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
                    resetOnSuccess={['file']}
                    className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[66vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        {/* TODO make a max of mb (seem that need less than 8mb) */}
                                        <FieldLabel htmlFor="link-form-file">
                                            {t('form.fileLink')}
                                        </FieldLabel>
                                        <Input id="link-form-file" name='file' type='file' />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
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