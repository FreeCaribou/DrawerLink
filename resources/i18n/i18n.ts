import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';
import nl from './nl.json';

const resources = {
    en: { translation: en, },
    fr: { translation: fr },
    nl: { translation: nl },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('i18n') || "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;