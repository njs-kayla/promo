import api from "./api";
import i18n from "./i18n";

export const checkExpired = (time) => {
    let now = new Date();
    let expiredTime = new Date(time);
    return (expiredTime - now) < 0;
}

export const datePad = (num) => ('0' + num).slice(-2);

// AM/PM 轉換
export const formatAMPM = (time) => {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Taipei'
    }).format(time);
};

// in 語系時間
export function formatTimeIn(startDate, endDate) {
    const startTime = new Date(startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const endTime = new Date(endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const startPeriod = startTime.includes('AM') ? 'सुबह' : 'दोपहर';
    const endPeriod = endTime.includes('AM') ? 'सुबह' : 'दोपहर';

    const formattedStartTime = startTime.replace('AM', '').replace('PM', '').trim();
    const formattedEndTime = endTime.replace('AM', '').replace('PM', '').trim();

    return `${startPeriod} ${formattedStartTime} बजे से ${endPeriod} ${formattedEndTime} बजे`;
}



// 月份轉換
export const formatMonth = (time, isShort = false) => {
    const localeLan = i18n.language === 'sa-IN' ? 'en-US' : i18n.language
    return time.toLocaleString(localeLan, { month: isShort ? 'short' : 'long' });
}

// st, nd, rd, th 判定
export const getOrdinalSuffix = (num) => {
    let j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

// htmlImg 處理
export const htmlImg = (htmlStr) => {
    if (!htmlStr) return null;
    const { HOST_URL } = api()
    let buffer = htmlStr.replace(/<img[^>]*>/g, function (match) {
        return match.replace(/<img\s+src="(?:https?:\/\/[^\/]+)?(\/[^"]+)"[^>]*>/g, '<img src="' + HOST_URL + '$1">');
    })

    return buffer
}

// 合併子陣列
export const mergedArray = (arr) => arr.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
}, []);

// 語言與幣別配對
export const getCurrByLang = () => {
    const languageCurrencyMap = {
        "en-US": "USD",
        "zh-CN": "CNY",
        "id-ID": "IDR",
        "th-TH": "THB",
        "ko-KR": "KRW",
        "ms-MY": "MYR",
        "vi-VN": "VND",
        "en-SG": "SGD",
        "my-MM": "MMK",
        "en-AU": "AUD",
        "hi-IN": "INR",
        "ja-JP": "JPY",
        "pt-BR": "BRL",
        "bn-BD": "BDT",
        "es-MX": "MXN",
        "fil-PH": "PHP",
        "sa-IN": "INR"
    };
    if (i18n.language == 'zh-CN') {
        return "人民币"
    }
    return languageCurrencyMap[i18n.language] || "USD"
} 

const monthsInSanskrit = [
    "जनवरी",  // 一月
    "फरवरी",  // 二月
    "मार्च",   // 三月
    "अप्रैल",  // 四月
    "मई",      // 五月
    "जून",     // 六月
    "जुलाई",   // 七月
    "अगस्त",   // 八月
    "सितंबर",  // 九月
    "अक्टोबर", // 十月
    "नवंबर",   // 十一月
    "दिसंबर"   // 十二月
];


export const transformSa = (time) => {
    return monthsInSanskrit[time]
}

// 節流
export const throttle = (callback, delay) => {
    let timer = null

    return (...args) => {
        if (timer) return

        timer = setTimeout(() => {
            callback(...args)
            timer = null
        }, delay)
    }
}


/**
 * 根據目前模組位置和圖片檔名，回傳 public 中的圖片路徑
 * @param {string} moduleUrl - 例如傳入 import.meta.url
 * @param {string} imagePath - assets/images/ 下的相對路徑，例如 'bg.webp' 或 'deco/coin_1.webp'
 * @returns {string} - 對應 public 目錄下的絕對網址
 */
export function getPublicImage(moduleUrl, imagePath) {
  const match = moduleUrl.match(/\/template\/(.*?)\//);
  if (!match || !imagePath) return '';

  const folderName = match[1];
  return `/template/${folderName}/${imagePath}`;
}