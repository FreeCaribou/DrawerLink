import { ArgumentTopic, SavedLink } from "@/types";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { toastError } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function LinkLinkToArgumentForm({
    argumentTopic,
    setOpenLinkForm,
    savedLinks,
}: {
    argumentTopic: ArgumentTopic;
    setOpenLinkForm: (value: boolean) => void;
    savedLinks: SavedLink[];
}) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSavedLinkId, setSelectedSavedLinkId] = useState<string | undefined>(undefined);

    const handleSuccessLink = () => {
        setOpenLinkForm(false);
        setSelectedSavedLinkId(undefined);
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        toastError(err);
        setIsLoading(false);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-primary'>{t('linkLink')}</CardTitle>
                <CardDescription className='text-secondary'>
                    {t('linkLinkDescription')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form action={'/arguments/' + argumentTopic.id + '/link'} method='post'
                    resetOnSuccess={['link']} onSuccess={handleSuccessLink} onError={handleError} onBefore={() => setIsLoading(true)}
                    className="flex flex-col gap-2">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="link-form-link" className='text-secondary'>
                                {t('form.savedLinks')}
                            </FieldLabel>
                            <Select name='saved_link_id' value={selectedSavedLinkId} key={selectedSavedLinkId}
                                onValueChange={setSelectedSavedLinkId} required>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.chooseLink')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {savedLinks.map((sl) => (
                                            <SelectItem key={sl.id} value={sl.id.toString()}>{sl.draw.label} - {sl.label}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <div className="mt-2 flex gap-2">
                        <Button variant="outline" onClick={() => setOpenLinkForm(false)}>{t('cancel')}</Button>
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