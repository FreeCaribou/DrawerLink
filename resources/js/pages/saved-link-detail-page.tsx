import { ArgumentTopic, Draw, SavedLink } from "@/types";
import AppInternLayout from "@/layouts/app-intern-layout";
import React, { useEffect, useRef, useState } from "react";
import { CalendarIcon, DownloadIcon, ExternalLinkIcon, FolderSymlinkIcon, LinkIcon, PencilIcon, SaveIcon, TagIcon, Trash2Icon, UnlinkIcon, WarehouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, Head, Link } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import DateFormater from "@/components/date-formater";
import SavedObjectForm from "@/components/saved-object-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";
import { toastError } from "@/lib/utils";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function DrawCard({
    savedLink,
    blockEdit = true,
    sharedKey,
    drawBaseList = [],
}: {
    savedLink: SavedLink;
    blockEdit: boolean;
    sharedKey: string;
    drawBaseList: Draw[];
}) {
    const { t } = useTranslation();
    const [savedLinkEdit, setSavedLinkEdit] = useState({ ...savedLink, editTags: savedLink.tags.map(t => t.label).join(',') });
    const [selectedDrawId, setSelectedDrawId] = useState<string>(savedLink.draw?.id?.toString());
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [openDate, setOpenDate] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date(savedLink.source_date));
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [valueDate, setValueDate] = React.useState(formatDate(date));
    const [openDialogLink, setOpenDialogLink] = useState(false);
    const [argumentTopics, setArgumentTopics] = useState<ArgumentTopic[]>([]);
    const [selectedArgumentTopicId, setSelectedArgumentTopicId] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const linkArgumentTopicFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openDialogLink && linkArgumentTopicFormRef.current) {
            linkArgumentTopicFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [openDialogLink]);

    function formatDate(date: Date | undefined) {
        if (!date) {
            return ""
        }
        return date.toLocaleDateString();
    }

    function isValidDate(date: Date | undefined) {
        if (!date) {
            return false
        }
        return !isNaN(date.getTime());
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSavedLinkEdit(prev => ({ ...prev, [name]: value }));
    };

    const handleSuccess = () => {
        setOpenDialog(false);
    };

    const baseUrl = window.location.origin;
    const sharedUrl = savedLink.shared_key
        ? `${baseUrl}/shared/saved-links/${savedLink.shared_key}`
        : null;
    const copyToClipboard = () => {
        if (sharedUrl) {
            navigator.clipboard.writeText(sharedUrl)
                .then(() => {
                    toast.success("Link url copy to be shared", { position: "top-center" });
                })
                .catch(err => console.error('Échec de la copie : ', err));
        }
    };

    const handlePutSuccess = () => {
        setEditMode(false);

        setSavedLinkEdit({ ...savedLink, editTags: savedLink.tags.map(t => t.label).join(',') });
        setSelectedDrawId(savedLink.draw?.id?.toString());
        setOpenDialog(false);
        setDate(new Date(savedLink.source_date));
        setMonth(undefined);
        setValueDate("");
    };

    const handleSuccessLink = () => {
        setOpenDialogLink(false);
        setSelectedArgumentTopicId(undefined);
    };

    /**
     * Get all the argument topic from the current user
     */
    const getArgumentTopics = async () => {
        const argumentTopicsAlreadyThere: ArgumentTopic[] = savedLink.argument_topics || [];
        const argumentTopicsAlreadyThereId: number[] = argumentTopicsAlreadyThere.map(atat => atat.id);
        if (!argumentTopics || argumentTopics.length === 0) {
            try {
                const response = await axios.get('/data/argument-topics');
                const argumentTopicsData: ArgumentTopic[] = response.data.argument_topics;
                setArgumentTopics(argumentTopicsData.filter(svd => !argumentTopicsAlreadyThereId.includes(svd.id)));
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
            const argumentTopicsData: ArgumentTopic[] = argumentTopics;
            setArgumentTopics(argumentTopicsData.filter(svd => !argumentTopicsAlreadyThereId.includes(svd.id)));
        }
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    return (
        <AppInternLayout>
            <Head title={'Link - ' + savedLink.label}></Head>
            {!editMode ? (
                <div>
                    <h2>{savedLink.label}</h2>

                    <div className="mt-5 flex">
                        <WarehouseIcon className='text-secondary mr-2'></WarehouseIcon> {savedLink.draw?.label}

                        {savedLink.tags?.length > 0 &&
                            <div className="flex w-full flex-wrap gap-2 ml-5">
                                <TagIcon className='text-secondary'></TagIcon>
                                {savedLink.tags.map((tag) => (
                                    <React.Fragment key={tag.id}>
                                        <Badge variant="secondary">{tag.label}</Badge>
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        <span className="ml-5 flex">
                            <DateFormater date={savedLink.updated_at}></DateFormater>
                        </span>
                    </div>

                    <div className="mt-5">
                        {savedLink.description}
                    </div>

                    {savedLink.full_source && (
                        <a href={savedLink.full_source} target="_blank" className="flex gap-2 mt-5 text-secondary font-bold">
                            {savedLink.base_source || savedLink.full_source}
                            <ExternalLinkIcon className='text-secondary'></ExternalLinkIcon>
                        </a>
                    )}

                    {savedLink.source_date && (
                        <div className="flex gap-2 mt-5 text-secondary">
                            {t('sourceDate')} <DateFormater date={savedLink.source_date}></DateFormater>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Form
                        action={"/saved-links/" + savedLink.id}
                        method='put'
                        onSuccess={handlePutSuccess}
                        onError={handleError}
                        className="flex flex-col gap-2">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="link-form-draw" className='text-secondary'>
                                            {t('form.drawForLink')}
                                        </FieldLabel>
                                        <Select name='draw_id' value={selectedDrawId} key={selectedDrawId}
                                            onValueChange={setSelectedDrawId} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('form.chooseDraw')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {drawBaseList.map((draw) => (
                                                        <React.Fragment key={draw.id}>
                                                            <SelectItem value={draw.id.toString()}>{draw.label}</SelectItem>
                                                        </React.Fragment>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-label" className='text-secondary'>
                                            {t('form.label')}
                                        </FieldLabel>
                                        <Input id="link-form-label" name='label'
                                            value={savedLinkEdit.label} onChange={handleChange} required />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-description" className='text-secondary'>
                                            {t('form.description')}
                                        </FieldLabel>
                                        <Textarea id="link-form-description" name='description'
                                            value={savedLinkEdit.description} onChange={handleChange} rows={5} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-tags" className='text-secondary'>
                                            {t('form.someTags')}
                                        </FieldLabel>
                                        <Input id="link-form-tags" name='editTags'
                                            value={savedLinkEdit.editTags} onChange={handleChange} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-sourceDate" className='text-secondary'>
                                            {t('form.sourceDate')}
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id="date-required"
                                                value={valueDate}
                                                placeholder="01/01/2026"
                                                name="source_date"
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value)
                                                    setValueDate(e.target.value)
                                                    if (isValidDate(date)) {
                                                        setDate(date)
                                                        setMonth(date)
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "ArrowDown") {
                                                        e.preventDefault()
                                                        setOpenDate(true)
                                                    }
                                                }}
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <Popover open={openDate} onOpenChange={setOpenDate}>
                                                    <PopoverTrigger asChild>
                                                        <InputGroupButton
                                                            id="date-picker"
                                                            variant="ghost"
                                                            size="icon-xs"
                                                            aria-label={t('form.sourceDate')}
                                                        >
                                                            <CalendarIcon />
                                                            <span className="sr-only">{t('form.selectDate')}</span>
                                                        </InputGroupButton>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            month={month}
                                                            onMonthChange={setMonth}
                                                            onSelect={(date) => {
                                                                setDate(date)
                                                                setValueDate(formatDate(date))
                                                                setOpenDate(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-fullSource" className='text-secondary'>
                                            {t('form.sourceOfLink')}
                                        </FieldLabel>
                                        <Input id="link-form-fullSource" type='url' name='full_source'
                                            placeholder='https://' value={savedLinkEdit.full_source} onChange={handleChange} />
                                    </Field>

                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>

                        <Button
                            type="submit"
                            className="cursor-pointer mt-5"
                        >
                            {t('save')}
                        </Button>
                    </Form>
                </div>
            )}

            {savedLink.saved_object_props.length > 0 && (
                <div className="mt-5">
                    <p className="text-secondary font-extrabold tracking-tight">{t('form.relatedFiles')}</p>
                    {savedLink.saved_object_props.map((objectProp) => (
                        <React.Fragment key={objectProp.id}>
                            <div className="mb-2 flex gap-2">
                                <p className="flex items-center gap-2 ">
                                    <span className="break-all">{objectProp.name}</span>
                                    <a
                                        href={sharedKey
                                            ? "/shared/download-saved-object/" + objectProp.id + "/" + sharedKey
                                            : "/download-saved-object/" + objectProp.id}
                                        target="_blank"
                                        rel="noopener"
                                        className="flex items-center"
                                    >
                                        <DownloadIcon className='text-secondary'></DownloadIcon>
                                        ({Math.round(objectProp.size / (1024 * 1024) * 100) / 100} Mo
                                        {objectProp.size === 0 && (<span> - Probably an error, please delete and reupload the file</span>)}
                                        )
                                    </a>
                                </p>
                                {editMode && (
                                    <Form action={"/saved-object/" + objectProp.id} onError={handleError} method="delete">
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            className="cursor-pointer"
                                        >
                                            <Trash2Icon></Trash2Icon>
                                        </Button>
                                    </Form>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )}

            {editMode && (
                <div className="mt-5">
                    <SavedObjectForm savedLinkId={savedLink.id}></SavedObjectForm>
                </div>
            )}

            {!blockEdit && savedLink.argument_topics?.length > 0 && (
                <div className="mt-5">
                    <p className="text-secondary font-extrabold tracking-tight">{t('relatedArgumentTopics')}</p>
                    <ul className='list-disc ml-5'>
                        {savedLink.argument_topics?.map((at) => (
                            <React.Fragment key={'at-' + at.id}>
                                <li>
                                    <Link href={'/arguments/' + at.id}>{at.label}</Link>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}

            {editMode && (
                <div className="mt-5">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="cursor-pointer">
                                {t('delete')}
                                <Trash2Icon></Trash2Icon>
                            </Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>{t('deleteSur')}</DialogTitle>
                                <DialogDescription>{t('deleteSurDescription')}</DialogDescription>
                            </DialogHeader>
                            <Form action={"/saved-links/" + savedLink.id} method="delete" onSuccess={handleSuccess} onError={handleError}>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    {t('yes')}
                                    <Trash2Icon></Trash2Icon>
                                </Button>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            )}

            {!blockEdit && (
                <div className="mt-5">
                    <p>
                        <Button variant="secondary" className='cursor-pointer'
                            onClick={() => { getArgumentTopics(); setOpenDialogLink(!openDialogLink) }}>
                            {t('linkTopic')} <FolderSymlinkIcon />
                        </Button>
                    </p>

                    {openDialogLink && (
                        <div className="mt-5" ref={linkArgumentTopicFormRef}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-primary'>{t('linkTopic')}</CardTitle>
                                    <CardDescription className='text-secondary'>
                                        {t('linkTopicDescription')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form
                                        action={'/saved-links/' + savedLink.id + '/argument-topic'} method='post' resetOnSuccess={['link']}
                                        onSuccess={handleSuccessLink} onError={handleError} onBefore={() => setIsLoading(true)}
                                        className="flex flex-col gap-2">
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="link-form-link" className='text-secondary'>
                                                    {t('form.argumentTopics')}
                                                </FieldLabel>
                                                <Select name='argument_topic_id' value={selectedArgumentTopicId} key={selectedArgumentTopicId}
                                                    onValueChange={setSelectedArgumentTopicId} required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('form.chooseTopic')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {argumentTopics.map((at) => (
                                                                <React.Fragment key={at.id}>
                                                                    <SelectItem value={at.id.toString()}>{at.label}</SelectItem>
                                                                </React.Fragment>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        </FieldGroup>
                                        <div className="mt-2 flex gap-2">
                                            <Button variant="outline" onClick={() => setOpenDialogLink(false)}>{t('cancel')}</Button>
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

                    <Button
                        className="cursor-pointer mt-5"
                        onClick={() => setEditMode(!editMode)}
                    >
                        {!editMode ? t('goEditMode') : t('cancelEditMode')}
                        <PencilIcon></PencilIcon>
                    </Button>

                    <div className="mt-5">
                        {savedLink.shared_key ? (
                            <div>
                                <p>
                                    {t(('shareLinkLink'))}
                                    <span className="cursor-pointer text-primary italic" onClick={copyToClipboard}> {sharedUrl}</span>
                                </p>
                                <Form action={"/saved-links/" + savedLink.id + "/shared-key"} onError={handleError} method="delete">
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="cursor-pointer mt-2"
                                    >
                                        {t('deleteSharedLink')}
                                        <UnlinkIcon />
                                    </Button>
                                </Form>
                            </div>
                        ) : (
                            <Form action={"/saved-links/" + savedLink.id + "/shared-key"} onError={handleError} method="patch">
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    {t(('shareLink'))}
                                    <LinkIcon />
                                </Button>
                            </Form>
                        )}
                    </div>

                </div>
            )}
        </AppInternLayout>
    );
}