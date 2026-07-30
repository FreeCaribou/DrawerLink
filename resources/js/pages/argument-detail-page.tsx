import { ArgumentTopic, SavedLink } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Form, Link } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toastError } from '@/lib/utils';
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePlusIcon, MessageCirclePlusIcon, PencilIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import DialogDeleteArgument from '@/components/dialog-delete-argument';
import DialogDeleteArgumentLink from '@/components/dialog-delete-argument-link';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArgumentDetail({
    argumentTopic
}: {
    argumentTopic: ArgumentTopic
}) {
    const { t } = useTranslation();

    const [openArgumentForm, setOpenArgumentForm] = useState(false);
    const [openLinkForm, setOpenLinkForm] = useState(false);
    const [savedLinks, setSavedLinks] = useState<SavedLink[]>([]);
    const [selectedSavedLinkId, setSelectedSavedLinkId] = useState<string | undefined>(undefined);
    const [openDialogDeleteTopic, setOpenDialogDeleteTopic] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [argumentTopicEdit, setArgumentTopicEdit] = useState({ ...argumentTopic });
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccessArgument = () => {
        setOpenArgumentForm(false);
        setIsLoading(false);
    };

    const handleSuccessLink = () => {
        setOpenLinkForm(false);
        setSelectedSavedLinkId(undefined);
        setIsLoading(false);
    };

    const handleSuccessDeleteTopic = () => {
        setOpenDialogDeleteTopic(false);
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        toastError(err);
        setIsLoading(false);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setArgumentTopicEdit(prev => ({ ...prev, [name]: value }));
    };

    const handlePutSuccess = () => {
        setEditMode(false);
        setArgumentTopicEdit({ ...argumentTopic });
        setIsLoading(false);
    };

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
                {!editMode ? (
                    <div>
                        <h1>{argumentTopic.label}</h1>
                        {argumentTopic.description}
                    </div>
                ) : (
                    <div>
                        <Card>
                            <CardContent>
                                <Form action={'/arguments/' + argumentTopic.id} method='put'
                                    resetOnSuccess={['label', 'description']} onSuccess={handlePutSuccess} onError={handleError} onBefore={() => setIsLoading(true)}
                                    className="flex flex-col gap-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="argument-topic-form-label">
                                                {t('form.label')}
                                            </FieldLabel>
                                            <Input value={argumentTopicEdit.label} onChange={handleChange} id="argument-topic-form-label" name='label' required />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="argument-topic-form-description">
                                                {t('form.description')}
                                            </FieldLabel>
                                            <Textarea value={argumentTopicEdit.description} onChange={handleChange} id="argument-topic-form-description" name='description' rows={2} />
                                        </Field>
                                    </FieldGroup>
                                    <div className="mt-2 flex gap-2">
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
                    </div>
                )}

                {argumentTopic.arguments?.length > 0 &&
                    <div className='mt-5 text-secondary italic'>
                        {t('argumentArguments')}
                    </div>
                }
                <ul className='list-disc ml-5'>
                    {argumentTopic.arguments?.map((argument) => (
                        <li key={'argument-' + argument.id}>
                            {argument.label}
                            {editMode && (<DialogDeleteArgument argument={argument} argumentTopicId={argumentTopic.id}></DialogDeleteArgument>)}
                            <p>{argument.description}</p>
                        </li>
                    ))}
                </ul>

                {argumentTopic.saved_links?.length > 0 &&
                    <div className='mt-5 text-secondary italic'>
                        {t('argumentSavedLinks')}
                    </div>
                }
                <ul className='list-disc ml-5'>
                    {argumentTopic.saved_links?.map((savedLink) => (
                        <li key={'savedLink' + savedLink.id}>
                            <Link href={'/saved-links/' + savedLink.id}>{savedLink.label}</Link>
                            {editMode && (<DialogDeleteArgumentLink argumentTopicId={argumentTopic.id} savedLink={savedLink}></DialogDeleteArgumentLink>)}
                        </li>
                    ))}
                </ul>
                <div className='mt-5 flex gap-2'>
                    <Button variant="secondary" onClick={() => setOpenArgumentForm(!openArgumentForm)}>
                        {t('addArgument')} <MessageCirclePlusIcon />
                    </Button>

                    <Button variant="secondary" onClick={() => { getSavedLinks(); setOpenLinkForm(!openArgumentForm) }}>
                        {t('linkLink')} <FilePlusIcon />
                    </Button>
                </div>

                {openArgumentForm && (
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
                )}

                {openLinkForm && (
                    <Card className='mt-2'>
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
                )}

                {editMode && (
                    <div className='mt-8'>
                        <Dialog open={openDialogDeleteTopic} onOpenChange={setOpenDialogDeleteTopic}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="cursor-pointer" disabled={isLoading}>
                                    {t('delete')}
                                    {isLoading ? <Spinner /> : <Trash2Icon />}
                                </Button>
                            </DialogTrigger>
                            <DialogContent showCloseButton={false} className="sm:max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>{t('deleteSur')}</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <Form action={"/arguments/" + argumentTopic.id} method="delete"
                                    onSuccess={handleSuccessDeleteTopic} onError={handleError} onBefore={() => setIsLoading(true)}>
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        {t('yes')}
                                        {isLoading ? <Spinner /> : <Trash2Icon />}
                                    </Button>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>
            <Button
                className="cursor-pointer mt-5"
                onClick={() => setEditMode(!editMode)}
            >
                {!editMode ? t('goEditMode') : t('cancelEditMode')}
                <PencilIcon />
            </Button>
        </AppInternLayout>
    );
}
