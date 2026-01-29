import { Card, CardContent } from "./ui/card";
import { Form } from '@inertiajs/react';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function DrawerForm({
}: {
    }) {
    return (
        <Card>
            <CardContent>
                <Form action="/draws" method='post' resetOnSuccess={['label', 'description']} className="flex flex-col gap-2">
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Add a draw</FieldLegend>
                            <FieldDescription>
                                You want a new draw / category ?
                            </FieldDescription>
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
                        <Field orientation="responsive">
                            {/* TODO disabled when form not valid */}
                            <Button
                                type="submit"
                                className="cursor-pointer"
                            >
                                Add
                            </Button>
                        </Field>
                    </FieldGroup>
                </Form>
            </CardContent>
        </Card>
    );
}