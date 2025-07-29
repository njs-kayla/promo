import i18n from '@/service/i18n';
import RWD from '@/service/RWD';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';



const timeForm = (timeStr, type = null) => {
    const time = new Date(timeStr);
    const date = time.getDate();
    const datetime = formatAMPM(time).slice(0, 5);
    const month = formatMonth(time);
    const monthZhKo = formatMonth(time, true);
    const year = time.getFullYear();
    const isEnd = type === "end";
    const { isMobile } = RWD()

    const formats = {
        "en-US": isEnd ? `${date}<b>${getOrdinalSuffix(date)}</b> ${month} ${year} ${datetime}` : `${date}<b>${getOrdinalSuffix(date)}</b> ${month} ${datetime}`,
        "zh-CN": isEnd ? `${monthZhKo}${date}日 ${datetime}` : `${year}年${monthZhKo}${date}日 ${datetime}`,
        "default": isEnd ? `${date}<b>${getOrdinalSuffix(date)}</b> ${month} ${year} ${datetime}` : `${date}<b>${getOrdinalSuffix(date)}</b> ${month} ${datetime}`,
    };

    return <span dangerouslySetInnerHTML={{ __html: formats[i18n.language] || formats.default}}></span>;
};

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1];
    const AMPM = (time) => (formatAMPM(new Date(time)).slice(-2));

    if (!dateData) return null

    return (
        <h2 className="bn-date">
            {timeForm(startDate)}
            <span className='ampm'>{AMPM(startDate)}</span> - {timeForm(endDate, "end")}
            <span className='ampm'>{AMPM(endDate)}</span>
            <span className="gmt"> (GMT+8)</span>
        </h2>
    )
}

export default DateHeading
