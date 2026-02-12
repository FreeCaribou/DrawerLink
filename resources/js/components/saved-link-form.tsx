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

export default function SavedLinkForm({
    drawBaseList = [],
}: {
    drawBaseList: Draw[]
}) {

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

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="secondary">Add a link</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Add a link</DialogTitle>
                    <DialogDescription>
                        What is the interesting article you found ?
                    </DialogDescription>
                </DialogHeader>
                <Form
                    action="/saved-links"
                    method='post'
                    onSuccess={handleSuccess}
                    resetOnSuccess={['label', 'description', 'file', 'tags', 'source_date']}
                    className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[66vh] overflow-y-auto px-4">
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
                                        <Input id="link-form-label" name='label' required />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-description">
                                            Description
                                        </FieldLabel>
                                        <Textarea id="link-form-description" name='description' rows={5} />
                                    </Field>

                                    <Field>
                                        {/* TODO make a max of mb (seem that need less than 8mb) */}
                                        <FieldLabel htmlFor="link-form-file">
                                            A file for the link
                                        </FieldLabel>
                                        <Input id="link-form-file" name='file' type='file' />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="link-form-tags">
                                            Some tag ? (separate them with a ",")
                                        </FieldLabel>
                                        <Input id="link-form-tags" name='tags' />
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

                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>

                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="cursor-pointer"
                            >
                                Add
                            </Button>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}