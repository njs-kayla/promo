import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import RWD from '@/service/RWD';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1];
    const { isMobile } = RWD()

    const dateForm = (timeStr, type = null) => {
        const time = new Date(timeStr)
        if (isMobile) {
            switch (i18n.language) {
                case 'en-US':
                    return <>
                        {time.getFullYear()} {time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}
                    </>
                case 'id-ID':
                    return <>
                        {time.getFullYear()} {time.getDate()} {formatMonth(time)}
                    </>
                case 'ms-MY':
                    return <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                    </>
                case 'vi-VN':
                    return <>
                        {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                    </>
                case 'th-TH':
                    return <>
                        {time.getDate()} {formatMonth(time, true)} {time.getFullYear() + 543}
                    </>
            }
        } else {
            switch (i18n.language) {
                case 'en-US':
                    return <>
                        {time.getFullYear()} <span className='MD'>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}</span> {formatAMPM(time).replace(" ", "")}
                    </>
                case 'id-ID':
                    return <>
                        {time.getFullYear()} <span className='MD'>{time.getDate()} {formatMonth(time)}</span> {formatAMPM(time).replace(" ", "")}
                    </>
                case 'ms-MY':
                    return <>
                        <span className='MD'>{time.getDate()} {formatMonth(time)}</span> {time.getFullYear()}, {formatAMPM(time).replace(" ", "")}
                    </>
                case 'vi-VN':
                    return <>
                        <span className='MD'>{time.getDate()} {formatMonth(time)}</span> {time.getFullYear()}, {formatAMPM(time).replace(" ", "")}
                    </>
                case 'th-TH':
                    return <>
                        <span className='MD'>{time.getDate()} {formatMonth(time, true)}</span> {time.getFullYear() + 543}, {formatAMPM(time).replace(" ", "")}
                    </>
            }
        }
    }

    const timeForm = (timeStr) => {
        const time = new Date(timeStr);
        return <>
            {formatAMPM(time)}
        </>
    }


    if (!dateData) return null

    return isMobile ? (
        <h2 className="bn-date">
            <div className="bn-date-span">
                {dateForm(startDate)} - {dateForm(endDate)}
            </div>
            <span className="bn-time">
                {timeForm(startDate)} - {timeForm(endDate)} (GMT+8)
            </span>
        </h2>
    ) : (
        <h2 className="bn-date">
            {dateForm(startDate)} - {dateForm(endDate)} (GMT+8)
        </h2>
    )
}

export default DateHeading