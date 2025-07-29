import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';



const Heading = ({timeStr, type = "default"}) => {

    const ordinalNumber = (n) => {
        return (['st', 'nd', 'rd'][n < 20 ? n - 1 : n % 10 - 1] || 'th')
    }

    const time = new Date(timeStr);
    let dateString = time.toLocaleString(i18n.language, {
        hour12: true,
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    const parts = dateString.replace(",", "").split(' ');

    dateString = i18n.language === 'en-US' ? (
        <>
            {parts[1]}
            <span className='ordinal'>{ordinalNumber(parts[1])}</span>
            {parts[0]}
            { type === 'end' && " " + parts[2] }
        </>
    ) : (
        <>
            {parts[0] + " "}
            {parts[1]}
            { type === 'end' && " " + parts[2] }
        </>
    )

    return dateString
}
const DateRange = ({ startDate, endDate }) => {
    return (
        <span className="bn-date-heading">
            <Heading timeStr={startDate} type={"start"} /> - <Heading timeStr={endDate} type={"end"}/>
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
            {parts[0] + " "}
            {parts[1].toLowerCase()}
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
                <span className="tilde"> - </span> 
                <Time timeStr={endDate} />
                <span className="gmt">(GMT+8)</span>
            </span>
        </h2>
    )
}

export default DateHeading
