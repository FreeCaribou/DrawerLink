import { SavedLink } from "@/types";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./ui/item";
import React from "react";
import { DownloadIcon, TagIcon, WarehouseIcon } from "lucide-react";
import { Badge } from "./ui/badge";

/**
 * Component to show a big preview of saved links, used for list without context
 * @param savedLinks 
 * @returns 
 */
export default function SavedLinkList({
    savedLinks = [],
}: {
    savedLinks: SavedLink[];
}) {
    return (
        <div>
            <h2>The saved links</h2>
            <ItemGroup>
                {savedLinks.map((link) => (
                    <React.Fragment key={link.id}>
                        <Item variant="outline" className='mb-2'>
                            <ItemContent>
                                <ItemTitle>{link.label}</ItemTitle>
                                <ItemDescription>
                                    {link.description}
                                </ItemDescription>
                                <p className="flex items-center gap-2">
                                    <WarehouseIcon size={18} className='text-secondary'></WarehouseIcon> {link.draw?.label}
                                </p>
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
                                {link.tags?.length > 0 &&
                                    <div className="flex w-full flex-wrap gap-2">
                                        <TagIcon size={18} className='text-secondary'></TagIcon>
                                        {link.tags.map((tag) => (
                                            <React.Fragment key={tag.id}>
                                                <Badge variant="secondary">{tag.label}</Badge>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                }
                            </ItemContent>
                        </Item>
                    </React.Fragment>
                ))}
            </ItemGroup>
        </div>
    );
}