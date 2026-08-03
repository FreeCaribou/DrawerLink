import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React, { useState } from "react";
import { Draw } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './ui/input-group';
import { CalendarIcon, SaveIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toastError } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Spinner } from './ui/spinner';

export default function SavedLinkForm({
    drawBaseList = [],
    setOpenLinkForm
}: {
    drawBaseList: Draw[];
    setOpenLinkForm: (value: boolean) => void;
}) {
    const { t } = useTranslation();
    const [selectedDrawId, setSelectedDrawId] = useState<string | undefined>(undefined);
    const [fileToBig, setFileToBig] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setOpenLinkForm(false);
        setDate(undefined);
        setMonth(undefined);
        setValueDate("");
        setIsLoading(false);
    };

    const handleError = (err: any) => {
        toastError(err);
        setIsLoading(false);
    }

    const handleFileChange = (e: any) => {
        const file = e?.target?.files[0];
        if (file && file.size > 25 * 1024 * 1024) { // 25 Mo en octets
            setFileToBig(true);
        } else {
            setFileToBig(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-primary'>{t('addLink')}</CardTitle>
                <CardDescription className='text-secondary'>
                    {t('interestingArticleFound')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    action="/saved-links" method='post'
                    onSuccess={handleSuccess} onError={handleError} onBefore={() => setIsLoading(true)}
                    resetOnSuccess={['label', 'description', 'file', 'tags', 'source_date']}
                    className="flex flex-col gap-2">
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
                            <Input id="link-form-label" name='label' required />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="link-form-description" className='text-secondary'>
                                {t('form.description')}
                            </FieldLabel>
                            <Textarea id="link-form-description" name='description' rows={5} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="link-form-file" className='text-secondary'>
                                {t('form.fileLink')}
                            </FieldLabel>
                            <Input id="link-form-file" onChange={handleFileChange} name='file' type='file' />
                            <small className="text-secondary block mt-1">
                                {t('form.maxFileSize', { size: '25 Mo' })}
                            </small>
                            {fileToBig && <p className="text-red-500 text-sm mt-1">{t('form.fileToBig')}</p>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="link-form-tags" className='text-secondary'>
                                {t('form.someTags')}
                            </FieldLabel>
                            <Input id="link-form-tags" name='tags' />
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
                            <Input id="link-form-fullSource" type='url' name='full_source' placeholder='https://' />
                        </Field>
                    </FieldGroup>

                    <div className="mt-2 flex gap-2">
                        <Button variant="outline" className="cursor-pointer" onClick={() => setOpenLinkForm(false)}>
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