import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React, { useState } from "react";
import { Draw } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './ui/input-group';
import { CalendarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';

export default function SavedLinkForm({
    drawBaseList = [],
}: {
    drawBaseList: Draw[]
}) {
    const { t } = useTranslation();
    const [selectedDrawId, setSelectedDrawId] = useState<string | undefined>(undefined);
    const [openDialog, setOpenDialog] = useState(false);

    const [openDate, setOpenDate] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
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

    /**
     * To reset the dropdown and some tricky field
     */
    const handleSuccess = () => {
        setSelectedDrawId(undefined);
        setOpenDialog(false);
        setDate(undefined);
        setMonth(undefined);
        setValueDate("");
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="secondary">{t('addLink')}</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{t('addLink')}</DialogTitle>
                    <DialogDescription>
                        {t('interestingArticleFound')}
                    </DialogDescription>
                </DialogHeader>
                <Form
                    action="/saved-links"
                    method='post'
                    onSuccess={handleSuccess}
                    onError={handleError}
                    resetOnSuccess={['label', 'description', 'file', 'tags', 'source_date']}
                    className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[66vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-draw">
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
                                        <FieldLabel htmlFor="link-form-label">
                                            {t('form.label')}
                                        </FieldLabel>
                                        <Input id="link-form-label" name='label' required />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-description">
                                            {t('form.description')}
                                        </FieldLabel>
                                        <Textarea id="link-form-description" name='description' rows={5} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-file">
                                            {t('form.fileLink')}
                                        </FieldLabel>
                                        <Input id="link-form-file" name='file' type='file' />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-tags">
                                            {t('form.someTags')}
                                        </FieldLabel>
                                        <Input id="link-form-tags" name='tags' />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-sourceDate">
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
                                        <FieldLabel htmlFor="link-form-fullSource">
                                            {t('form.sourceOfLink')}
                                        </FieldLabel>
                                        <Input id="link-form-fullSource" type='url' name='full_source' placeholder='https://' />
                                    </Field>

                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>

                        <DialogFooter className="mt-5 pb-2">
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
    );
}