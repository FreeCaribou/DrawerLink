import { Form } from '@inertiajs/react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function DrawerForm({
}: {
    }) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleSuccess = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline">Add a draw</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add a draw</DialogTitle>
                    <DialogDescription>
                        You want a new draw / category ?
                    </DialogDescription>
                </DialogHeader>
                <Form action="/draws" method='post' resetOnSuccess={['label', 'description']} onSuccess={handleSuccess} className="flex flex-col gap-2">
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="draw-form-label">
                                            Label of the draw
                                        </FieldLabel>
                                        <Input id="draw-form-label" name='label' required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="draw-form-description">
                                            Description
                                        </FieldLabel>
                                        <Textarea id="draw-form-description" name='description' rows={2} />
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