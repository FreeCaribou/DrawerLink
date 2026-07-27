import { ArgumentTopic, FlashProps } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ArgumentHome({
    argumentTopics = [],
    flash = {},
}: {
    argumentTopics: ArgumentTopic[];
    flash: FlashProps;
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
        <AppInternLayout>
            <div>
                {flash?.success && (
                    <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
                        {flash.success}
                    </div>
                )}

                {argumentTopics.map((at) => (
                    <React.Fragment key={at.id}>
                        <div className='mb-2'>
                            <Link href={'/arguments/' + at.id.toString()}>{at.label}</Link>
                        </div>
                    </React.Fragment>
                ))}

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button variant="secondary">{t('addArgumentTopic')}</Button>
                    </DialogTrigger>
                    <DialogContent showCloseButton={false} className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>{t('addArgumentTopic')}</DialogTitle>
                        </DialogHeader>
                        <Form action="/arguments" method='post' resetOnSuccess={['label', 'description']} onSuccess={handleSuccess} onError={handleError} className="flex flex-col gap-2">
                            <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="argument-topic-form-label">
                                                    {t('form.label')}
                                                </FieldLabel>
                                                <Input id="argument-topic-form-label" name='label' required />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="argument-topic-form-description">
                                                    {t('form.description')}
                                                </FieldLabel>
                                                <Textarea id="argument-topic-form-description" name='description' rows={2} />
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
            </div>
        </AppInternLayout>
    );
}
