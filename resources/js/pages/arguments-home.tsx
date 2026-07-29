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
}: {
    argumentTopics: ArgumentTopic[];
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
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                    {argumentTopics.map((at) => (
                        <React.Fragment key={at.id}>
                            <div>
                                <Link href={'/arguments/' + at.id.toString()}>
                                    <h4 className='text-secondary! mb-0!'>{at.label}</h4>
                                </Link>
                                <p className='text-secondary italic'>
                                    (
                                    {(at.arguments_count && at.arguments_count > 0) ?
                                        <span>{at.arguments_count} {t('argumentsLowerCase')}</span> : ''
                                    }
                                    {(at.arguments_count && at.arguments_count > 0 && at.saved_links_count && at.saved_links_count > 0) ?
                                        <span> {t('and')} </span> : ''
                                    }
                                    {(at.saved_links_count && at.saved_links_count > 0) ?
                                        <span>{at.saved_links_count} {t('linksLowerCase')}</span> : ''
                                    }
                                    )
                                </p>
                                <p className='whitespace-nowrap overflow-hidden text-ellipsis'>
                                    {at.description}
                                </p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <div className='mt-8'>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button variant="secondary">{t('addArgumentTopic')}</Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>{t('addArgumentTopic')}</DialogTitle>
                                <DialogDescription>
                                    {t('addArgumentTopicDescription')}
                                </DialogDescription>
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
            </div>
        </AppInternLayout>
    );
}
