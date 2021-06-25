/**
 * How to use it?
 * 
 * 1) Import useTranslation in the target component
 * import { useTranslation } from 'react-i18next';
 * 
 * 2) Destructure 't' from useTranslation hook:
 * const { t } = useTranslation();
 * 
 * 3) Use t('') function in order to get the label in the language selected
 * t('nameLabelVariable')  <-- The label variable is the one you defined into translations.js file.
 * 
 * 
 * ***Notes: 
 * You can import i18n and change the language from anywhere of the project by doing this:
 *      i18n.changeLanguage('en'); You will be switching to English with this.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATION_EN } from './en/translations';
import { TRANSLATION_ES } from './es/translations';


export const languages = {
    resources: {
        en: {
            text: 'English',
            translation: TRANSLATION_EN,
        },
        es: {
            text: 'Español',
            translation: TRANSLATION_ES,
        },
    },
};

i18n.use(LanguageDetector).use(initReactI18next).init(languages);
i18n.changeLanguage();
export default i18n;
