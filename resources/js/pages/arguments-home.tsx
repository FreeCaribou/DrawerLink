import { ArgumentTopic } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FolderPlusIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function ArgumentHome({
    argumentTopics = [],
}: {
    argumentTopics: ArgumentTopic[];
}) {

    const { t } = useTranslation();
    const [openForm, setOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccess = () => {
        setOpenForm(false);
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        console.error(err);
        toastError(err);
        setIsLoading(false);
    }

    const getCountText = (argumentsCount: number = 0, linksCount: number = 0) => {
        const parts = [];
        if (argumentsCount > 0) parts.push(`${argumentsCount} ${t('argumentsLowerCase')}`);
        if (linksCount > 0) parts.push(`${linksCount} ${t('linksLowerCase')}`);
        return parts.length > 0 ? ` (${parts.join(` ${t('and')} `)})` : '';
    };

    return (
        <AppInternLayout>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                {argumentTopics.map((at) => (
                    <div key={at.id}>
                        <Link href={'/arguments/' + at.id.toString()}>
                            <h4 className='text-secondary! mb-0!'>{at.label}</h4>
                        </Link>
                        <p className='text-secondary italic'>{getCountText(at.arguments_count, at.saved_links_count)}</p>
                        <p className='whitespace-nowrap overflow-hidden text-ellipsis'>
                            {at.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className='mt-8'>
                <Button variant="secondary" className="cursor-pointer" onClick={() => setOpenForm(!openForm)}>
                    {t('addArgumentTopic')} <FolderPlusIcon />
                </Button>
                {openForm && (
                    <Form
                        action="/arguments" method='post'
                        resetOnSuccess={['label', 'description']} onSuccess={handleSuccess} onError={handleError} onBefore={() => setIsLoading(true)}
                        className="flex flex-col gap-2 mt-2"
                    >
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
                        <div className="mt-5 flex gap-2">
                            <Button variant="outline" className="cursor-pointer" onClick={() => setOpenForm(false)}>{t('cancel')}</Button>
                            <Button
                                type="submit"
                                className="cursor-pointer"
                                disabled={isLoading}
                            >
                                {t('add')} {isLoading && <Spinner />}
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </AppInternLayout>
    );
}
