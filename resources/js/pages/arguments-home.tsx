import { ArgumentTopic } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import React from 'react';
import { Link } from "@inertiajs/react";

export default function ArgumentHome({
    argumentTopics = []
}: {
    argumentTopics: ArgumentTopic[]
}) {
    return (
        <AppInternLayout>
            <div>
                {argumentTopics.map((at) => (
                    <React.Fragment key={at.id}>
                        <div className='mb-2'>
                            <Link href={'/arguments/' + at.id.toString()}>{at.label}</Link>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </AppInternLayout>
    );
}
