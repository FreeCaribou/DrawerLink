import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';

export default function DrawerForm({
}: {
    }) {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);

    const handleSuccess = () => {
        setOpenDialog(false);
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="secondary">{t('addDraw')}</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{t('addDraw')}</DialogTitle>
                    <DialogDescription>
                        {t('wantNewDraw')}
                    </DialogDescription>
                </DialogHeader>
                <Form action="/draws" method='post' resetOnSuccess={['label', 'description']} onSuccess={handleSuccess} onError={handleError} className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="draw-form-label">
                                            {t('form.label')}
                                        </FieldLabel>
                                        <Input id="draw-form-label" name='label' required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="draw-form-description">
                                            {t('form.description')}
                                        </FieldLabel>
                                        <Textarea id="draw-form-description" name='description' rows={2} />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline">{t('cancel')}</Button>
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