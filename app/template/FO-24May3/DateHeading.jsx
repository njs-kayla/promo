import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import RWD from '@/service/RWD';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1];
    const { isMobile } = RWD()

    const timeForm = (timeStr, type = null) => {
        const time = new Date(timeStr)

        if (isMobile) {
            switch (i18n.language) {
                case 'en-US':
                    return type === "end" ? <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                    </> : <>
                        {time.getDate()} {formatMonth(time)}
                    </>
                case 'id-ID':
                    return type === "end" ? <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                    </> : <>
                        {time.getDate()} {formatMonth(time)}
                    </>
                default:
                    return <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                    </>
    
            }
        } else {
            switch (i18n.language) {
                case 'en-US':
                    return type === "end" ? <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()} {formatAMPM(time).toLowerCase().replace(" ", "")}
                    </> : <>
                        {time.getDate()} {formatMonth(time)} {formatAMPM(time).toLowerCase().replace(" ", "")}
                    </>
                case 'id-ID':
                    return type === "end" ? <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()} {formatAMPM(time).toLowerCase().replace(" ", "")}
                    </> : <>
                        {time.getDate()} {formatMonth(time)} {formatAMPM(time).toLowerCase().replace(" ", "")}
                    </>
                default:
                    return <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()} {formatAMPM(time)}
                    </>
    
            }
        }
    }

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
                        <span className="gmt-stroke"> (GMT+8)</span>
                    </span>
                    
                </>
             }

        </h2>
    )
}

export default DateHeading