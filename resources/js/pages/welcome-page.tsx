import { Draw, FlashProps } from '@/types';
import DrawerForm from '@/components/drawer-form';
import SavedLinkForm from '@/components/saved-link-form';
import React, { useEffect, useRef, useState } from 'react';
import DrawCard from '@/components/draw-card';
import AppInternLayout from '@/layouts/app-intern-layout';
import BigSearch from '@/components/big-search';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, FolderPlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Welcome({
    drawBaseList = [],
    flash = {},
}: {
    drawBaseList: Draw[];
    flash: FlashProps;
}) {
    const { t } = useTranslation();

    const [drawList, setDrawList] = useState<Draw[]>([]);
    const [openDrawForm, setOpenDrawForm] = useState(false);
    const drawFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDrawList(drawBaseList);
    }, [drawBaseList]);

    useEffect(() => {
        if (openDrawForm && drawFormRef.current) {
            drawFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [openDrawForm]);

    return (
        <AppInternLayout>
            {flash?.success && (
                <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}

            <div className='mb-6'>
                <Collapsible className="data-[state=open]:bg-muted rounded-md">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="group w-full">
                            <span className='text-secondary text-xl'>{t('searchLink')}</span>
                            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col p-2.5 pt-0">
                        <BigSearch></BigSearch>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <h3>{t('yourDraw')}</h3>

            <div>
                {drawList.map((d) => (
                    <React.Fragment key={d.id}>
                        <div className='mb-2'>
                            <DrawCard drawProp={d}></DrawCard>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className='mt-5 flex gap-2'>
                {drawList.length > 0 && (
                    <SavedLinkForm drawBaseList={drawList} />
                )}

                <Button variant="secondary" className="cursor-pointer" onClick={() => setOpenDrawForm(!openDrawForm)}>
                    {t('addDraw')} <FolderPlusIcon />
                </Button>
            </div>

            {openDrawForm && (
                <div className='mt-2' ref={drawFormRef}>
                    <DrawerForm setOpenDrawForm={setOpenDrawForm} />
                </div>
            )}

        </AppInternLayout>
    );
}
