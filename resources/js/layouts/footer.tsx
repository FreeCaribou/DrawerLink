import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'nl', name: 'Nederland', flag: 'nl' },
];

export default function Footer({ }: {}) {
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18n', lng);
    };

    return (
        <footer className="bg-gradient-to-b from-primary to-primary/75 w-full pt-5 flex-auto">
            <div className='px-2 pb-2'>
                {t('language')}
                <Select name='changelang_id' value={i18n.language} onValueChange={(value) => changeLanguage(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {languages.map((language) => (
                                <React.Fragment key={language.code}>
                                    <SelectItem value={language.code} key={language.code}>{language.name}</SelectItem>
                                </React.Fragment>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </footer>
    );
}
