import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React, { useState } from "react";
import { Draw } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function SavedLinkForm({
    drawBaseList = [],
}: {
    drawBaseList: Draw[]
}) {

    const [selectedDrawId, setSelectedDrawId] = useState<string | undefined>(undefined);
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * To reset the dropdown
     */
    const handleSuccess = () => {
        setSelectedDrawId(undefined);
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="secondary">Add a link</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-sm">
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
                    resetOnSuccess={['label', 'description', 'file', 'tags']}
                    className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
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