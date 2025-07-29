import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const date_template = (timeStr) => {
        let time = new Date(timeStr);
        let dateString;
        switch (i18n.language) {
            case 'zh-CN':
                dateString = `
                ${time.getFullYear()} 年 ${formatMonth(time, true)} ${time.getDate()} 日
                `
                break;
            case 'vi-VN':
                dateString = `
                Ngày ${time.getDate()}, ${formatMonth(time)}, ${time.getFullYear()}
                `
                break;
            case 'th-TH':
                dateString = `
                ${time.getDate()} ${formatMonth(time)} ${time.getFullYear() + 543}
                `
                break;
            case 'en-US':
                dateString = `
                ${time.getDate()}${getOrdinalSuffix(time.getDate())} ${formatMonth(time)} ${time.getFullYear()}
                `
                break;
            case 'ko-KR':
                dateString = `
                ${time.getFullYear()}년 ${formatMonth(time, true)} ${time.getDate()}일
                `
                break;
            default:
                dateString = `
                ${time.getDate()} ${formatMonth(time)} ${time.getFullYear()}
                `
        }
        return dateString;
    }

    if (!dateData) return null

    return (
        <h3 className="bn-date">
            <strong className="date">{date_template(startDate)} - {date_template(endDate)}</strong>
            <strong className="time">{formatAMPM(new Date(startDate))} - {formatAMPM(new Date(endDate))}</strong>
            <span className="gmt">[ GMT+8 ]</span>
        </h3>
    )
}

export default DateHeading
