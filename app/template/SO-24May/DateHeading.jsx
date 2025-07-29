import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const dateForm = (timeStr) => {
        const time = new Date(timeStr)

        switch (i18n.language) {
            case 'th-TH':
                return <>
                    <span>{time.getDate()}</span><span>{formatMonth(time)}</span><span>{time.getFullYear() + 543}</span>
                </>
            case 'en-US':
                return <>
                   <span>{time.getDate()}</span><span>{formatMonth(time)}</span><span>{time.getFullYear()}</span>
                </>
            default:
                return <>
                    <span>{time.getDate()}</span><span>{formatMonth(time)}</span><span>{time.getFullYear()}</span>
                </>

        }
    }

    const timeForm = (str) => {
        let date = new Date(str)
        return <>
            {formatAMPM(date)}
        </> 
    }

    if (!dateData) return null

    return (
        <>
            <h3 className="bn-date">{dateForm(startDate)}<span>-</span>{dateForm(endDate)}</h3>
            <h3 className="bn-time">{timeForm(startDate)}-{timeForm(endDate)} (GMT+8)</h3>
        </>
    )
}

export default DateHeading
