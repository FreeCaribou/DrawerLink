import { ArgumentTopic, SavedLink } from '@/types';
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
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ArgumentDetail({
    argumentTopic
}: {
    argumentTopic: ArgumentTopic
}) {
    const { t } = useTranslation();

    const [openDialogArgument, setOpenDialogArgument] = useState(false);
    const [openDialogLink, setOpenDialogLink] = useState(false);
    const [savedLinks, setSavedLinks] = useState<SavedLink[]>([]);
    const [selectedSavedLinkId, setSelectedSavedLinkId] = useState<string | undefined>(undefined);

    const handleSuccessArgument = () => {
        setOpenDialogArgument(false);
    };

    const handleSuccessLink = () => {
        setOpenDialogLink(false);
        setSelectedSavedLinkId(undefined);
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    /**
     * Get all the saved link from the current user
     */
    const getSavedLinks = async () => {
        // We don't re make the call if the saved links are already present but we still need to check the no doublon
        const savedLinksAlreadyThere: SavedLink[] = argumentTopic.saved_links || [];
        const savedLinksAlreadyThereId: number[] = savedLinksAlreadyThere.map(slat => slat.id);
        if (!savedLinks || savedLinks.length === 0) {
            try {
                const response = await axios.get('/data/saved-links');
                const savedLinksData: SavedLink[] = response.data.saved_links;
                setSavedLinks(savedLinksData.filter(svd => !savedLinksAlreadyThereId.includes(svd.id)));
            } catch (error: any) {
                console.error("Error :", error.response.data);
                toast(
                    error.response.data.error,
                    {
                        position: "top-right",
                        description: error.response.data.messages?.map(
                            (m: string, key: number) =>
                                `${m}${key + 1 >= error.response.data.messages.length ? '' : '/'}`
                        )
                    }
                );
            }
        } else {
            const savedLinksData: SavedLink[] = savedLinks;
            setSavedLinks(savedLinksData.filter(svd => !savedLinksAlreadyThereId.includes(svd.id)));
        }
    };

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
                <div className='mt-5 flex gap-2'>
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
                            <Form action={'/arguments/' + argumentTopic.id + '/argument'} method='post' resetOnSuccess={['label', 'description']} onSuccess={handleSuccessArgument} onError={handleError} className="flex flex-col gap-2">
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

                    <Dialog open={openDialogLink} onOpenChange={(isOpen) => { setOpenDialogLink(isOpen); getSavedLinks() }}>
                        <DialogTrigger asChild>
                            <Button variant="secondary">{t('linkLink')}</Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>{t('linkLink')}</DialogTitle>
                                <DialogDescription>
                                    {t('linkLinkDescription')}
                                </DialogDescription>
                            </DialogHeader>
                            <Form action={'/arguments/' + argumentTopic.id + '/link'} method='post' resetOnSuccess={['link']} onSuccess={handleSuccessLink} onError={handleError} className="flex flex-col gap-2">
                                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                                    <FieldGroup>
                                        <FieldSet>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor="link-form-link">
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
                                                                    <React.Fragment key={sl.id}>
                                                                        <SelectItem value={sl.id.toString()}>{sl.draw.label} - {sl.label}</SelectItem>
                                                                    </React.Fragment>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
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
