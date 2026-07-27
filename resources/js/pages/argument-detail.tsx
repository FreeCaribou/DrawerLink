import { ArgumentTopic } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import React from 'react';

export default function ArgumentDetail({
    argumentTopic
}: {
    argumentTopic: ArgumentTopic
}) {
    return (
        <AppInternLayout>
            <div>
                <h1>{argumentTopic.label}</h1>
                {argumentTopic.description}
                <ul className='list-disc ml-5'>
                    {argumentTopic.arguments?.map((argument) => (
                        <React.Fragment key={argument.id}>
                            <li>
                                {argument.label}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </AppInternLayout>
    );
}
