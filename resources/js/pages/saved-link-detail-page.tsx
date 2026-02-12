import { SavedLink } from "@/types";
import AppInternLayout from "@/layouts/app-intern-layout";
import React, { useState } from "react";
import { DownloadIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function DrawCard({
    savedLink,
}: {
    savedLink: SavedLink;
}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleSuccess = () => {
        setOpenDialog(false);
    };

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

            <div className="mt-5">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="cursor-pointer">
                            <Trash2Icon></Trash2Icon>
                            Delete
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

            <h3 className="mt-5">Todo</h3>
        </AppInternLayout>
    );
}