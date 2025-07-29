import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/i18n/en-US.json';
import cn from '../assets/i18n/zh-CN.json';
import vn from '../assets/i18n/vi-VN.json';
import id from '../assets/i18n/id-ID.json';
import my from '../assets/i18n/ms-MY.json';
import th from '../assets/i18n/th-TH.json';
import kr from '../assets/i18n/ko-KR.json';
import sa from '../assets/i18n/sa-IN.json';

const resources = {
    'en-US': {
        translation: en,
    },
    'zh-CN': {
        translation: cn,
    },
    'vi-VN': {
        translation: vn,
    },
    'id-ID': {
        translation: id,
    },
    'ms-MY': {
        translation: my,
    },
    'th-TH': {
        translation: th,
    },
    'ko-KR': {
        translation: kr,
    },
    'sa-IN': {
        translation: sa,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en-US',            //預設語言
    fallbackLng: 'en-US',     //如果當前切換的語言沒有對應的翻譯則使用這個語言，
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;