import { ArgumentTopic } from '@/types';
import AppInternLayout from '@/layouts/app-intern-layout';
import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from '@inertiajs/react';

export default function ArgumentDetail({
    argumentTopic
}: {
    argumentTopic: ArgumentTopic
}) {
    const { t } = useTranslation();

    return (
        <AppInternLayout>
            <div>
                <h1>{argumentTopic.label}</h1>
                {argumentTopic.description}

                <p>{t('argumentArguments')}</p>
                <ul className='list-disc ml-5'>
                    {argumentTopic.arguments?.map((argument) => (
                        <React.Fragment key={'argument-' + argument.id}>
                            <li>
                                {argument.label}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>

                {argumentTopic.saved_links?.length > 0 &&
                    <div className='mt-5'>
                        {t('argumentSavedLinks')}
                    </div>
                }
                <ul className='list-disc ml-5'>
                    {argumentTopic.saved_links?.map((savedLink) => (
                        <React.Fragment key={'savedLink' + savedLink.id}>
                            <li>
                                <Link href={'/saved-links/' + savedLink.id}>{savedLink.label}</Link>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </AppInternLayout>
    );
}
