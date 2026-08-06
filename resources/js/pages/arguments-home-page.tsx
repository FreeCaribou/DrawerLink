import { ArgumentTopic } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, Head } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FolderPlusIcon, SaveIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ArgumentTopicsGrid from '@/components/argument-topics-grid';

export default function ArgumentHome({
    argumentTopics = [],
}: {
    argumentTopics: ArgumentTopic[];
}) {
    const { t } = useTranslation();
    const [openForm, setOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openForm && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [openForm]);

    const handleSuccess = () => {
        setOpenForm(false);
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        console.error(err);
        toastError(err);
        setIsLoading(false);
    }

    return (
        <AppInternLayout>
            <Head title='Topic'></Head>
            <ArgumentTopicsGrid argumentTopics={argumentTopics} />
            <div className='mt-8'>
                <Button variant="secondary" className="cursor-pointer" onClick={() => setOpenForm(!openForm)}>
                    {t('addArgumentTopic')} <FolderPlusIcon />
                </Button>
                {openForm && (
                    <Card className='mt-2'>
                        <CardHeader>
                            <CardTitle className='text-primary'>{t('addArgumentTopic')}</CardTitle>
                            <CardDescription className='text-secondary'>{t('addArgumentTopicDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div ref={formRef}>
                                <Form
                                    action="/arguments" method='post'
                                    resetOnSuccess={['label', 'description']} onSuccess={handleSuccess} onError={handleError} onBefore={() => setIsLoading(true)}
                                    className="flex flex-col gap-2 mt-2"
                                >
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="argument-topic-form-label" className='text-secondary'>
                                                {t('form.label')}
                                            </FieldLabel>
                                            <Input id="argument-topic-form-label" name='label' required />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="argument-topic-form-description" className='text-secondary'>
                                                {t('form.description')}
                                            </FieldLabel>
                                            <Textarea id="argument-topic-form-description" name='description' rows={2} />
                                        </Field>
                                    </FieldGroup>
                                    <div className="mt-2 flex gap-2">
                                        <Button variant="outline" className="cursor-pointer" onClick={() => setOpenForm(false)}>
                                            {t('cancel')}
                                        </Button>
                                        <Button type="submit" className="cursor-pointer" disabled={isLoading}>
                                            {t('save')} {isLoading ? <Spinner /> : <SaveIcon />}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppInternLayout>
    );
}
