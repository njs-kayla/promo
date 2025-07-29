import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';



const Heading = ({timeStr, type = "default"}) => {

    const ordinalNumber = (n) => {
        return (['st', 'nd', 'rd'][n < 20 ? n - 1 : n % 10 - 1] || 'th')
    }
    const time = new Date(timeStr);
    const locale = ['en-US', 'ms-MY', 'id-ID'].includes(i18n.language) ? 'en-US' : i18n.language;
    let dateString = time.toLocaleString(locale, {
        hour12: true,
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    if (locale === 'en-US') {
        const parts = dateString.replace(",", "").split(' ');
        dateString = (
            <>
                {parts[1]}
                <span className="ordinal">{ordinalNumber(parts[1])} </span>
                <span className="month">{parts[0]} </span>
                { type === 'end' && parts[2] }
            </>
        );
    } else if (['zh-CN', 'ko-KR'].includes(i18n.language)) {
       return type === 'end' ? (
         dateString.slice(5)
       ) : (
         dateString
       )
    } else if ( ['th-TH', 'vi-VN'].includes(i18n.language) ) {
       return type === 'start' ? (
         dateString.slice(0, -5).replace(/,/, "")
       ) : (
         dateString.replace(/,/, "")
       )
    }

    return dateString
}
const DateRange = ({ startDate, endDate }) => {
    return (
        <span className="bn-date-heading">
            <Heading timeStr={startDate} type={"start"} /> ~ <Heading timeStr={endDate} type={"end"}/>
        </span>
    );
}
const Time = ({ timeStr }) => {
    const time = new Date(timeStr);
    let dateString = time.toLocaleString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    });
    let parts = dateString.split(' ');
    const timeString = (
        <>
            {parts[0]}
            <span className="period">{parts[1].toLowerCase()}</span>
            {parts[2]}
        </>
    )
    return timeString
}

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    if (!dateData) return null

    return (
        <h2 className="bn-date">
            <DateRange startDate={startDate} endDate={endDate}/>
            <span className="bn-date-time">
                <Time timeStr={startDate} />
                <span className="tilde"> ~ </span> 
                <Time timeStr={endDate} />
                <span className="gmt"> GMT+8</span>
            </span>
        </h2>
    )
}

export default DateHeading
