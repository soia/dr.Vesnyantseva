import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

const currentLang = localStorage.getItem('i18nextLngVesnyantseva');

if (localStorage.getItem('i18nextLngVesnyantseva') === null) {
    localStorage.setItem('i18nextLngVesnyantseva', 'ua');
}

i18n.use(Backend)

    .use(initReactI18next)

    .init({
        fallbackLng: currentLang || 'ua',
        lng: currentLang || 'ua',
        debug: true,

        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;
