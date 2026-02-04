import { logout } from '@/routes';
import { Draw, FlashProps, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DrawerForm from '@/components/drawer-form';
import SavedLinkForm from '@/components/saved-link-form';

import React, { useEffect, useState } from 'react';
import DrawCard from '@/components/draw-card';
import AppInternLayout from '@/layouts/app-intern-layout';

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
