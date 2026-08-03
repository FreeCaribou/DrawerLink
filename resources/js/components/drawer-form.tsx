import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';
import { SaveIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Spinner } from './ui/spinner';

export default function DrawerForm({
    setOpenDrawForm
}: {
    setOpenDrawForm: (value: boolean) => void;
}) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccess = () => {
        setIsLoading(false);
        setOpenDrawForm(false);
    };

    const handleError = (err: any) => {
        toastError(err);
        setIsLoading(false);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-primary'>{t('addDraw')}</CardTitle>
                <CardDescription className='text-secondary'>{t('wantNewDraw')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form action="/draws" method='post'
                    resetOnSuccess={['label', 'description']} onSuccess={handleSuccess} onError={handleError} onBefore={() => setIsLoading(true)}
                    className="flex flex-col gap-2">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="draw-form-label" className='text-secondary'>
                                {t('form.label')}
                            </FieldLabel>
                            <Input id="draw-form-label" name='label' required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="draw-form-description" className='text-secondary'>
                                {t('form.description')}
                            </FieldLabel>
                            <Textarea id="draw-form-description" name='description' rows={2} />
                        </Field>
                    </FieldGroup>
                    <div className="mt-2 flex gap-2">
                        <Button variant="outline" className="cursor-pointer" onClick={() => setOpenDrawForm(false)}>
                            {t('cancel')}
                        </Button>
                        <Button type="submit" className="cursor-pointer" disabled={isLoading}>
                            {t('save')} {isLoading ? <Spinner /> : <SaveIcon />}
                        </Button>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
}