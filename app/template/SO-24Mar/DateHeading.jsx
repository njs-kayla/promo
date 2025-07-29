import i18n from '@/service/i18n';
import RWD from '@/service/RWD';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]
    const { isMobile } = RWD()

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        let dateString = time.toLocaleString(i18n.language, {
            month: isMobile ? 'numeric' : 'long',
            day: 'numeric',
            year: 'numeric'
        });
        if (i18n.language === 'en-US' && !isMobile) {
            let parts = dateString.replace(/,/, "").split(" ")
            return parts[1] + getOrdinalSuffix(parts[1]) + " " + parts[0] +  " " + parts[2]
        }

        if (isMobile && i18n.language !=='zh-CN') {
            var parts = dateString.split('/');
            return parts[0] + '/' + parts[1] + ' ' + parts[2];
        }
        
        return dateString;

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
                {parts[1]}
            </>
        )
        return timeString
    }

    if (!dateData) return null

    return (
        <>
            <h2 className="bn-date">
                {timeForm(startDate)} - {timeForm(endDate)}
                <strong className='bn-time'>
                    <Time timeStr={startDate} /> - <Time timeStr={endDate} />
                    <span>[GMT+8]</span>
                </strong>
            </h2>
        </>
    )
}

export default DateHeading
