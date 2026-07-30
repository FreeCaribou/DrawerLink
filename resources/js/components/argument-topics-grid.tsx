import { ArgumentTopic } from '@/types';
import { Link } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';

export default function ArgumentTopicsGrid({
    argumentTopics = [],
}: {
    argumentTopics: ArgumentTopic[];
}) {
    const { t } = useTranslation();

    const getCountText = (argumentsCount: number = 0, linksCount: number = 0) => {
        const parts = [];
        if (argumentsCount > 0) parts.push(`${argumentsCount} ${t('argumentsLowerCase')}`);
        if (linksCount > 0) parts.push(`${linksCount} ${t('linksLowerCase')}`);
        return parts.length > 0 ? ` (${parts.join(` ${t('and')} `)})` : '';
    };

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
            {argumentTopics.map((at) => (
                <div key={at.id}>
                    <Link href={'/arguments/' + at.id.toString()}>
                        <h4 className='text-secondary! mb-0!'>{at.label}</h4>
                    </Link>
                    <p className='text-secondary italic'>{getCountText(at.arguments_count, at.saved_links_count)}</p>
                    <p className='whitespace-nowrap overflow-hidden text-ellipsis'>
                        {at.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
