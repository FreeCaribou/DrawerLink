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

export default function SavedObjectForm({
    savedLinkId,
}: {
    savedLinkId: number,
}) {
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * To reset the dropdown and some tricky field
     */
    const handleSuccess = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="secondary">Add a file</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Add a new file for the link</DialogTitle>
                </DialogHeader>
                <Form
                    action={"/saved-links/" + savedLinkId + "/saved-object"}
                    method='post'
                    onSuccess={handleSuccess}
                    resetOnSuccess={['file']}
                    className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[66vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        {/* TODO make a max of mb (seem that need less than 8mb) */}
                                        <FieldLabel htmlFor="link-form-file">
                                            A file for the link
                                        </FieldLabel>
                                        <Input id="link-form-file" name='file' type='file' />
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