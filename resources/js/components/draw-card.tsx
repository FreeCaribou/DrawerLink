import { Draw } from "@/types";
import React, { useState } from "react";
import { ChevronDownIcon, DownloadIcon, TagIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./ui/item";
import { Badge } from "./ui/badge";

export default function DrawCard({
    drawProp,
}: {
    drawProp: Draw;
}) {

    const [draw, setDraw] = useState(drawProp);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Get the detail of a draw and show it
     * @param id 
     */
    const getDrawDetails = async () => {
        // We don't re make the call if the saved links are already present
        if (!draw?.saved_links) {
            setIsLoading(true);
            const drawDetails = await axios.get('/data/draws/' + draw.id);
            setDraw({ ...draw, saved_links: drawDetails.data.saved_links });
            setIsLoading(false);
        }
    };

    return (
        <Collapsible className="data-[state=open]:bg-muted rounded-md">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="group w-full" onClick={() => getDrawDetails()}>
                    <span className='text-primary text-xl'>{draw.label}</span> ({draw.saved_links_count} links)
                    <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col p-2.5 pt-0">
                <div>
                    {isLoading ? (
                        <div>
                            {Array.from({ length: draw.saved_links_count }, (_, i) => (
                                <Skeleton key={i} className="h-8 mb-2" />
                            ))}
                        </div>
                    ) : (
                        <div>
                            {draw?.saved_links && (
                                <div>
                                    <ItemGroup>
                                        {draw.saved_links.map(l => (
                                            <React.Fragment key={l.id}>
                                                <Item variant="outline" className='mb-2'>
                                                    <ItemContent>
                                                        <ItemTitle>{l.label}</ItemTitle>
                                                        <ItemDescription>
                                                            {l.description}
                                                        </ItemDescription>
                                                        {l.tags?.length > 0 &&
                                                            <div className="flex w-full flex-wrap gap-2">
                                                                <TagIcon size={18} className='text-secondary'></TagIcon>
                                                                {l.tags.map((tag) => (
                                                                    <React.Fragment key={tag.id}>
                                                                        <Badge variant="secondary">{tag.label}</Badge>
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        }
                                                        {l.saved_object_props.length > 0 && (
                                                            <div>
                                                                The related file:
                                                                {l.saved_object_props.map((objectProp) => (
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
                                                    </ItemContent>
                                                </Item>
                                            </React.Fragment>
                                        ))}
                                    </ItemGroup>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}