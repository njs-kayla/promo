import i18n from '@/service/i18n';
import { getOrdinalSuffix } from '@/service/util';
import ReactWOW from 'react-wow';

const Heading = ({timeStr, type = "default", isMobile}) => {
    const time = new Date(timeStr); 
    if (isMobile && i18n.language === 'ko-KR') {
        let dateString = time.toLocaleString(i18n.language, {
            month: 'long',
            day: 'numeric',
            year: type === 'start' ? 'numeric' : undefined,
        });
        return dateString
    }
    if (i18n.language === 'en-US') {
        let dateString = time.toLocaleString(i18n.language, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            month: 'long',
            day: 'numeric',
            year: type === 'end' ? 'numeric' : undefined
        });
        const parts = dateString.replace(",", "").split(' ');

        if (type === 'start' && !isMobile) {
            dateString = (
                <span>
                    {parts[1]}<span className="small">{getOrdinalSuffix(parts[1])}</span> {parts[0]} {parts[3]}<span className="small">{parts[4]}</span>
                </span>
            );
        } else if (type === 'end' && !isMobile) {
            dateString = (
                <span>
                    {parts[1]}<span className="small">{getOrdinalSuffix(parts[1])}</span> {parts[0]} {parts[2]} {parts[4]}<span className="small">{parts[5]}</span>
                </span>
            );
        } else if (isMobile) {
            dateString = (
                <span>
                    {parts[1]}<span className="small">{getOrdinalSuffix(parts[1])}</span> {parts[0]}
                </span>
            );
        }
        return dateString
    }
    if (i18n.language === 'ko-KR') {
        let dateString = time.toLocaleString(i18n.language, {
            month: 'long',
            day: 'numeric',
            year: type === 'start' ? 'numeric' : undefined,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return dateString
    }
}
const DateRange = ({ startDate, endDate, isMobile }) => {
    return (
        <span className="bn-date-heading">
            <Heading timeStr={startDate} type={"start"} isMobile={isMobile} /> ~ <Heading timeStr={endDate} type={"end"} isMobile={isMobile}/>
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
            <span>{parts[1].toLowerCase()}</span>
        </>
    )
    return timeString
}
// eslint-disable-next-line react/prop-types
const DateHeading = ({ dateData, isMobile }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    if (!dateData) return null

    return isMobile ? (
        <h2 className="bn-date">
            <DateRange isMobile={isMobile} startDate={startDate} endDate={endDate}/>
            <div className="bn-time">
                <Time timeStr={startDate} />
                <span className="tilde"> - </span> 
                <Time timeStr={endDate} />
                <span className="gmt">GMT+8</span>
            </div>

        </h2>
    ) : (
        <ReactWOW animation='slideInUp' duration='0.8s' delay='0.5s' offset={100}>
            <h2 className="bn-date">
                <DateRange isMobile={isMobile} startDate={startDate} endDate={endDate}/>
                <span className='gmt'>GMT+8</span>
            </h2>
        </ReactWOW>
    )
}

export default DateHeading
