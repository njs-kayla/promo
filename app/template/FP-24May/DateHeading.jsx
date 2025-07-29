import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import RWD from '@/service/RWD';

const DateHeading = ({ dateData }) => {
    const startDate = dateData[0].startDate
    const endDate = dateData[dateData.length - 1].endDate;
    const { isMobile } = RWD()

    const timeForm = (timeStr, type = null) => {
        const time = new Date(timeStr);
        const AMPM = formatAMPM(time).toLowerCase();
        const date = time.getDate();
        const month = formatMonth(time);
        const monthZhKo = formatMonth(time, true);
        const year = time.getFullYear();
        const yearThai = year + 543;
        const isEnd = type === "end";
    
        const formats = {
            "en-US": isEnd ? `${date} ${month} ${year} ${AMPM}` : `${date} ${month} ${AMPM}`,
            "zh-CN": isEnd ? `${monthZhKo} ${date} 日 ${AMPM}` : `${year} 年 ${monthZhKo} ${date} 日 ${AMPM}`,
            "ko-KR": isEnd ? `${monthZhKo} ${date}일 ${AMPM}` : `${year}년 ${monthZhKo} ${date}일 ${AMPM}`,
            "th-TH": isEnd ? `${date} ${month} ${yearThai} ${AMPM}` : `${date} ${month} ${AMPM}`,
            "default": isEnd ? `${date} ${month} ${year} ${AMPM}` : `${date} ${month} ${AMPM}`
        };
    
        const mobileFormats = {
            "en-US": isEnd ? `${date} ${month} ${year}` : `${date} ${month}`,
            "zh-CN": isEnd ? `${monthZhKo}${date}日` : `${year} ${monthZhKo}${date}日`,
            "ko-KR": isEnd ? `${monthZhKo} ${date}일` : `${year}년 ${monthZhKo} ${date}일`,
            "th-TH": isEnd ? `${date} ${month} ${yearThai}` : `${date} ${month}`,
            "default": isEnd ? `${date} ${month} ${year}` : `${date} ${month}`
        };
    
        const format = isMobile ? mobileFormats[i18n.language] || mobileFormats.default : formats[i18n.language] || formats.default;
    
        return <>{format}</>;
    };
    

    if (!dateData) return null

    return (
        <h2 className="bn-date">
            { isMobile ? <>
                <span className='date'>{timeForm(startDate)} - {timeForm(endDate, "end")}</span>
                <span className='date-stroke'>{timeForm(startDate)} - {timeForm(endDate, "end")}</span>
                <div className="time-box">
                    <strong className="time">
                        {formatAMPM(new Date(startDate))} - {formatAMPM(new Date(endDate))} 
                        <span className="gmt"> (GMT+8)</span> 
                    </strong>
                    <strong className="time-stroke">
                        {formatAMPM(new Date(startDate))} - {formatAMPM(new Date(endDate))} 
                        <span className="gmt"> (GMT+8)</span> 
                    </strong>
                </div>
                </> :
                <>
                    <span className='date'>
                        {timeForm(startDate)} - {timeForm(endDate, "end")}
                        <span className="gmt"> (GMT+8)</span>
                    </span>
                    <span className='date-stroke'>
                        {timeForm(startDate)} - {timeForm(endDate, "end")}
                        <span className="gmt"> (GMT+8)</span>
                    </span>
                    
                </>
             }

        </h2>
    )
}

export default DateHeading