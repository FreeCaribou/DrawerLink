import { SavedLink } from "@/types";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./ui/item";
import React from "react";
import { CalendarCheckIcon, CalendarPlus2Icon, CalendarPlusIcon, DownloadIcon, ExternalLinkIcon, TagIcon, WarehouseIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "@inertiajs/react";
import DateFormater from "./date-formater";

/**
 * Component to show a big preview of saved links, used for list without context
 * TODO make it param to show or not the draw title or the download file and the big title
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
            {/* <h2>The saved links</h2> */}
            <ItemGroup>
                {savedLinks.map((link) => (
                    <React.Fragment key={link.id}>
                        <Item variant="outline" className='mb-2'>
                            <ItemContent>
                                <div className="grid md:grid-cols-2">
                                    <div>
                                        <ItemTitle>
                                            <Link href={"/saved-links/" + link.id}>{link.label}</Link>
                                        </ItemTitle>
                                        <ItemDescription>
                                            {link.description}
                                        </ItemDescription>
                                        {/* <p className="flex items-center gap-2">
                                    <WarehouseIcon size={18} className='text-secondary'></WarehouseIcon> {link.draw?.label}
                                </p> */}
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
                                        {link.full_source && (
                                            <a href={link.full_source} target="_blank" className="flex gap-2">
                                                <ExternalLinkIcon size={18} className='text-secondary'></ExternalLinkIcon>
                                                {link.base_source || link.full_source}
                                            </a>
                                        )}
                                    </div>
                                    <div>
                                        {link.saved_object_props.length > 0 && (
                                            <div>
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
                                        <div className="flex gap-2">
                                            {link.source_date && (<CalendarCheckIcon size={18} className="text-secondary"></CalendarCheckIcon>)}
                                            {!link.source_date && (<CalendarPlus2Icon size={18} className="text-secondary"></CalendarPlus2Icon>)}
                                            <DateFormater date={link.source_date || link.updated_at}></DateFormater>
                                        </div>
                                    </div>
                                </div>


                            </ItemContent>
                        </Item>
                    </React.Fragment>
                ))}
            </ItemGroup>
        </div>
    );
}