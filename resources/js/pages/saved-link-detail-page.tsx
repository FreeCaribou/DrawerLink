import { Draw, SavedLink } from "@/types";
import AppInternLayout from "@/layouts/app-intern-layout";
import React, { useState } from "react";
import { CalendarIcon, DownloadIcon, ExternalLinkIcon, PencilIcon, TagIcon, Trash2Icon, WarehouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    const [savedLinkEdit, setSavedLinkEdit] = useState({ ...savedLink, editTags: savedLink.tags.map(t => t.label).join(',') });
    const [selectedDrawId, setSelectedDrawId] = useState<string>(savedLink.draw?.id?.toString());
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [openDate, setOpenDate] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date(savedLink.source_date));
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [valueDate, setValueDate] = React.useState(formatDate(date));

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

    return (
        <AppInternLayout>
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
                            Source date <DateFormater date={savedLink.source_date}></DateFormater>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Form
                        action={"/saved-links/" + savedLink.id}
                        method='put'
                        onSuccess={handlePutSuccess}
                        className="flex flex-col gap-2">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="link-form-draw">
                                            The draw for the link
                                        </FieldLabel>
                                        <Select name='draw_id' value={selectedDrawId} key={selectedDrawId}
                                            onValueChange={setSelectedDrawId} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a draw" />
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
                                        <FieldLabel htmlFor="link-form-label">
                                            Label of the link
                                        </FieldLabel>
                                        <Input id="link-form-label" name='label'
                                            value={savedLinkEdit.label} onChange={handleChange} required />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-description">
                                            Description
                                        </FieldLabel>
                                        <Textarea id="link-form-description" name='description'
                                            value={savedLinkEdit.description} onChange={handleChange} rows={5} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-tags">
                                            Some tag ? (separate them with a ",")
                                        </FieldLabel>
                                        <Input id="link-form-tags" name='editTags'
                                            value={savedLinkEdit.editTags} onChange={handleChange} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-sourceDate">
                                            Date of the source ?
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
                                                            aria-label="Select date"
                                                        >
                                                            <CalendarIcon />
                                                            <span className="sr-only">Select date</span>
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
                                        <FieldLabel htmlFor="link-form-fullSource">
                                            Source of the link
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
                            Save the change
                        </Button>
                    </Form>
                </div>
            )}

            {savedLink.saved_object_props.length > 0 && (
                <div className="mt-5">
                    <p className="text-secondary font-extrabold tracking-tight">The related file</p>
                    {savedLink.saved_object_props.map((objectProp) => (
                        <React.Fragment key={objectProp.id}>
                            <div className="mb-2 flex gap-2">
                                <p className="flex items-center gap-2">
                                    {objectProp.name}
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
                                    <Form action={"/saved-object/" + objectProp.id} method="delete">
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
                <SavedObjectForm savedLinkId={savedLink.id}></SavedObjectForm>
            )}

            {editMode && (
                <div className="mt-5">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="cursor-pointer">
                                <Trash2Icon></Trash2Icon>
                                Delete this saved link
                            </Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Are you sur to delete this saved link ?</DialogTitle>
                            </DialogHeader>
                            <Form action={"/saved-links/" + savedLink.id} method="delete" onSuccess={handleSuccess}>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    <Trash2Icon></Trash2Icon>
                                    Yes
                                </Button>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            )}

            {!blockEdit && (
                <div>
                    <Button
                        className="cursor-pointer mt-5"
                        onClick={() => setEditMode(!editMode)}
                    >
                        <PencilIcon></PencilIcon>
                        {!editMode ? "Pass to edit mode" : "Remove edit mode"}
                    </Button>

                    <div className="mt-5">
                        {savedLink.shared_key ? (
                            <div>
                                <p>
                                    To share this link you can use this url:
                                    <span className="cursor-pointer text-primary italic" onClick={copyToClipboard}> {sharedUrl}</span>
                                </p>
                                <Form action={"/saved-links/" + savedLink.id + "/shared-key"} method="delete">
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="cursor-pointer mt-2"
                                    >
                                        Delete the shared url
                                    </Button>
                                </Form>
                            </div>
                        ) : (
                            <Form action={"/saved-links/" + savedLink.id + "/shared-key"} method="patch">
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Create a shared url for this link
                                </Button>
                            </Form>
                        )}
                    </div>

                </div>
            )}
        </AppInternLayout>
    );
}