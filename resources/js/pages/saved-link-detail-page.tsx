import { SavedLink } from "@/types";
import AppInternLayout from "@/layouts/app-intern-layout";
import React from "react";
import { DownloadIcon, Link, Trash2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@inertiajs/react";

export default function DrawCard({
    savedLink,
}: {
    savedLink: SavedLink;
}) {
    return (
        <AppInternLayout>
            <h2>{savedLink.label}</h2>
            {savedLink.saved_object_props.length > 0 && (
                <div className="mt-5">
                    The related file:
                    {savedLink.saved_object_props.map((objectProp) => (
                        <React.Fragment key={objectProp.id}>
                            <p className="flex items-center gap-2">
                                {objectProp.name}
                                <a
                                    href={"/download-saved-object/" + objectProp.id}
                                    target="_blank"
                                    rel="noopener"
                                    className="flex items-center"
                                >
                                    <DownloadIcon className='text-secondary'></DownloadIcon>
                                    ({Math.round(objectProp.size / (1024 * 1024) * 100) / 100} Mo
                                    {objectProp.size === 0 && (<span> - Probably an error, please reupload the file</span>)}
                                    )
                                </a>
                            </p>
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* TODO make a "sur" button */}
            <div className="mt-5">
                <Form action={"/saved-links/" + savedLink.id} method="delete">
                    <Button
                        type="submit"
                        variant="destructive"
                        className="cursor-pointer"
                    >
                        <Trash2Icon></Trash2Icon>
                        Delete
                    </Button>
                </Form>
            </div>

            <h3 className="mt-5">Todo</h3>
        </AppInternLayout>
    );
}