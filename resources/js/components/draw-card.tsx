import { Draw } from "@/types";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import SavedLinkList from "./saved-link-list";

export default function DrawCard({
    drawProp,
}: {
    drawProp: Draw;
}) {

    const [draw, setDraw] = useState(drawProp);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDraw(drawProp);
    }, [drawProp]);

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
                                <SavedLinkList savedLinks={draw.saved_links} />
                            )}
                        </div>
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}