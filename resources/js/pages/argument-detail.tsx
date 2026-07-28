import { ArgumentTopic } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Form, Link } from '@inertiajs/react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toastError } from '@/lib/utils';

export default function ArgumentDetail({
    argumentTopic
}: {
    argumentTopic: ArgumentTopic
}) {
    const { t } = useTranslation();

    const [openDialogArgument, setOpenDialogArgument] = useState(false);

    const handleSuccessArgument = () => {
        setOpenDialogArgument(false);
    };

    const handleErrorArgument = (err: any) => {
        toastError(err);
    }

    return (
        <AppInternLayout>
            <div>
                <h1>{argumentTopic.label}</h1>
                {argumentTopic.description}

                {argumentTopic.arguments?.length > 0 &&
                    <div className='mt-5'>
                        {t('argumentArguments')}
                    </div>
                }
                <ul className='list-disc ml-5'>
                    {argumentTopic.arguments?.map((argument) => (
                        <React.Fragment key={'argument-' + argument.id}>
                            <li>
                                {argument.label}
                                <p>{argument.description}</p>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>

                {argumentTopic.saved_links?.length > 0 &&
                    <div className='mt-5'>
                        {t('argumentSavedLinks')}
                    </div>
                }
                <ul className='list-disc ml-5'>
                    {argumentTopic.saved_links?.map((savedLink) => (
                        <React.Fragment key={'savedLink' + savedLink.id}>
                            <li>
                                <Link href={'/saved-links/' + savedLink.id}>{savedLink.label}</Link>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
                <div className='mt-5'>
                    <Dialog open={openDialogArgument} onOpenChange={setOpenDialogArgument}>
                        <DialogTrigger asChild>
                            <Button variant="secondary">{t('addArgument')}</Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>{t('addArgument')}</DialogTitle>
                                <DialogDescription>
                                    {t('addArgumentDescription')}
                                </DialogDescription>
                            </DialogHeader>
                            <Form action={'/arguments/' + argumentTopic.id + '/argument'} method='post' resetOnSuccess={['label', 'description']} onSuccess={handleSuccessArgument} onError={handleErrorArgument} className="flex flex-col gap-2">
                                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                                    <FieldGroup>
                                        <FieldSet>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor="argument-form-label">
                                                        {t('form.label')}
                                                    </FieldLabel>
                                                    <Input id="argument-form-label" name='label' required />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="argument-form-description">
                                                        {t('form.description')}
                                                    </FieldLabel>
                                                    <Textarea id="argument-form-description" name='description' rows={2} />
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
            </div>
        </AppInternLayout>
    );
}
