import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { logout } from '@/routes';
import { FlashProps, SavedLink, type SharedData } from '@/types';
import { Field } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { DownloadIcon } from 'lucide-react';
import React from 'react';

export default function Welcome({
    savedLinks = [],
    flash = {},
}: {
    savedLinks: SavedLink[];
    flash: FlashProps;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end">
                        <Link
                            href={logout()}
                            className="cursor-pointer inline-block rounded-sm border border-foreground px-5 py-1.5 text-sm"
                        >
                            Log out
                        </Link>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-[335px] lg:max-w-4xl lg:flex-row">

                        {flash?.success && (
                            <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
                                {flash.success}
                            </div>
                        )}

                        <div>
                            <h1>The saved links</h1>
                            <ItemGroup>
                                {savedLinks.map((link) => (
                                    <React.Fragment key={link.id}>
                                        <Item variant="outline" className='mb-2'>
                                            <ItemContent>
                                                <ItemTitle>{link.label}</ItemTitle>
                                                <ItemDescription>
                                                    {link.description}
                                                </ItemDescription>
                                                {link.saved_object_props.length > 0 && (
                                                    <div>
                                                        The related file:
                                                        {link.saved_object_props.map((objectProp) => (
                                                            <React.Fragment key={objectProp.id}>
                                                                <p className="flex items-center gap-2">
                                                                    {objectProp.name}
                                                                    <a
                                                                        href={"/download-saved-object/" + objectProp.id}
                                                                        target="_blank"
                                                                        rel="noopener"
                                                                        className="flex items-center"
                                                                    >
                                                                        <DownloadIcon></DownloadIcon>
                                                                    </a>
                                                                </p>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                )}
                                            </ItemContent>
                                        </Item>
                                    </React.Fragment>
                                ))}
                            </ItemGroup>
                        </div>

                        <Card className='mt-6'>
                            <CardContent>
                                <Form action="/saved-links" method='post' resetOnSuccess={['label', 'file']} className="mt-6 flex flex-col gap-2">
                                    <FieldGroup>
                                        <FieldSet>
                                            <FieldLegend>Add a link</FieldLegend>
                                            <FieldDescription>
                                                What is the interesting article you found ?
                                            </FieldDescription>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor="link-form-label">
                                                        Label of the link
                                                    </FieldLabel>
                                                    <Input
                                                        id="link-form-label"
                                                        name='label'
                                                        required
                                                    />
                                                </Field>
                                                <Field>
                                                    {/* TODO trying multiple file at once */}
                                                    <FieldLabel htmlFor="link-form-file">
                                                        A file for the link
                                                    </FieldLabel>
                                                    <Input id="link-form-file" name='file' type='file' />
                                                </Field>
                                            </FieldGroup>
                                        </FieldSet>
                                        <Field>
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
                    </main>
                </div>
            </div>
        </>
    );
}
