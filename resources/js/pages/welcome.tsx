import { Draw, FlashProps, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DrawerForm from '@/components/drawer-form';
import SavedLinkForm from '@/components/saved-link-form';

import React, { useEffect, useState } from 'react';
import DrawCard from '@/components/draw-card';
import AppInternLayout from '@/layouts/app-intern-layout';
import BigSearch from '@/components/big-search';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';

export default function Welcome({
    drawBaseList = [],
    flash = {},
}: {
    drawBaseList: Draw[];
    flash: FlashProps;
}) {
    const { auth } = usePage<SharedData>().props;

    const [drawList, setDrawList] = useState<Draw[]>([]);

    useEffect(() => {
        setDrawList(drawBaseList);
    }, [drawBaseList]);

    return (
        <AppInternLayout>
            {flash?.success && (
                <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}

            <h2>Welcome {auth.user.name}!</h2>

            {/* TODO put in the collapse after the test */}
            {/* <div className='mb-6'>
                <Collapsible className="data-[state=open]:bg-muted rounded-md">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="group w-full">
                            <span className='text-secondary text-xl'>Search link</span>
                            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col p-2.5 pt-0">
                    </CollapsibleContent>
                </Collapsible>
            </div> */}
            <BigSearch drawBaseList={drawList}></BigSearch>


            <h3>Your draw</h3>

            <div>
                {drawList.map((d) => (
                    <React.Fragment key={d.id}>
                        <div className='mb-2'>
                            <DrawCard drawProp={d}></DrawCard>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className='mt-6'>
                {drawList.length > 0 && (
                    <SavedLinkForm drawBaseList={drawList} />
                )}
            </div>

            <div className='mt-6'>
                <DrawerForm />
            </div>
        </AppInternLayout>
    );
}
