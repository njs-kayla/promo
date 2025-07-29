import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import RWD from '@/service/RWD';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1];

    const timeForm = (timeStr, type = null) => {
        const time = new Date(timeStr)
        switch (i18n.language) {
            case 'en-US':
                return type === "end" ? <>
                    {time.getDate()} {formatMonth(time, true).toUpperCase()} {time.getFullYear()} {formatAMPM(time).replace(" ", "")}
                </> : <>
                    {time.getDate()} {formatMonth(time, true).toUpperCase()} {formatAMPM(time).replace(" ", "")}
                </>
            case 'id-ID':
                return type === "end" ? <>
                    {time.getDate()} {formatMonth(time, true).toUpperCase()} {time.getFullYear()} {formatAMPM(time).replace(" ", "")}
                </> : <>
                    {time.getDate()} {formatMonth(time, true).toUpperCase()} {formatAMPM(time).replace(" ", "")}
                </>
            default:
                return <>
                    {time.getDate()} {formatMonth(time, true).toUpperCase()} {time.getFullYear()} {formatAMPM(time)}
                </>

        }
    }

    if (!dateData) return null

    return (
        <h2 className="bn-date">
            <span className='date'>
                {timeForm(startDate)} - {timeForm(endDate, "end")} (GMT+8)
            </span>
        </h2>
    )
}

export default DateHeading