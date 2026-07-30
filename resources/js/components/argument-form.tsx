import { ArgumentTopic } from "@/types";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Spinner } from "./ui/spinner";
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { toastError } from "@/lib/utils";

export default function ArgumentForm({
    argumentTopic,
    setOpenArgumentForm,
}: {
    argumentTopic: ArgumentTopic;
    setOpenArgumentForm: (value: boolean) => void;
}) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccessArgument = () => {
        setOpenArgumentForm(false);
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        toastError(err);
        setIsLoading(false);
    }

    return (
        <Card className='mt-2'>
            <CardHeader>
                <CardTitle className='text-primary'>{t('addArgument')}</CardTitle>
                <CardDescription className='text-secondary'>{t('addArgumentDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form action={'/arguments/' + argumentTopic.id + '/argument'} method='post'
                    resetOnSuccess={['label', 'description']} onSuccess={handleSuccessArgument} onError={handleError} onBefore={() => setIsLoading(true)}
                    className="flex flex-col gap-2">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="argument-form-label" className='text-secondary'>
                                {t('form.label')}
                            </FieldLabel>
                            <Input id="argument-form-label" name='label' required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="argument-form-description" className='text-secondary'>
                                {t('form.description')}
                            </FieldLabel>
                            <Textarea id="argument-form-description" name='description' rows={2} />
                        </Field>
                    </FieldGroup>
                    <div className="mt-2 flex gap-2">
                        <Button variant="outline" onClick={() => setOpenArgumentForm(false)}>{t('cancel')}</Button>
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={isLoading}
                        >
                            {t('save')} {isLoading ? <Spinner /> : <SaveIcon />}
                        </Button>
                    </div>
                </Form>
            </CardContent>
        </Card>
    )
}