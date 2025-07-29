import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';



const Heading = ({timeStr, type = "default"}) => {
    const ordinalNumber = (n) => {
        return (['st', 'nd', 'rd'][n < 20 ? n - 1 : n % 10 - 1] || 'th')
    }
    const time = new Date(timeStr);
    let dateString = time.toLocaleString(i18n.language, {
        hour12: true,
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    let parts = dateString.replace(",", "").split(' ')
    if (i18n.language === 'en-US') {
        dateString = (
            <>
                {parts[1]}
                <span>{ordinalNumber(parts[1])}</span>
                {type === 'end' &&  parts[0] + '.'} {type === 'end' && parts[2]}
            </>
        );
    } else {
        dateString = (
            <>
                {parts[0]}&nbsp;
                {parts[1]}&nbsp;
                {type !== 'start' && parts[2] }
            </>
        )
    }


    return dateString
}
const DateRange = ({ startDate, endDate }) => {
    return (
        <>
            <span className="bn-date-heading">
                <Heading timeStr={startDate} type={"start"} /> - <Heading timeStr={endDate} type={"end"}/>
            </span>
            <span className='date-stroke'>
                <Heading timeStr={startDate} type={"start"} /> - <Heading timeStr={endDate} type={"end"}/>
            </span>
        </>
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
            <span className="period">{parts[1]}</span>
            {parts[2]}
        </>
    )
    return timeString
}

const TimeRange = ({ startDate, endDate }) => {
    return (
        <>
            <span className="bn-date-time">
                <Time timeStr={startDate} />
                <span className="tilde"> - </span> 
                <Time timeStr={endDate} />
                <span className="gmt"> GMT+8</span>
            </span>
            <span className="date-time-stroke">
                <Time timeStr={startDate} />
                <span className="tilde"> - </span> 
                <Time timeStr={endDate} />
                <span className="gmt"> GMT+8</span>
            </span>
        </>
    )
}

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    if (!dateData) return null

    return (
        <h2 className="bn-date">
            <DateRange startDate={startDate} endDate={endDate}/>
            <TimeRange startDate={startDate} endDate={endDate}/>
        </h2>
    )
}

export default DateHeading
