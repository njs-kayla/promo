import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import i18n from '@/service/i18n';

const DateHeading = ({ dateData, GMT }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const dateForm = (timeStr) => {
        const time = new Date(timeStr)
        switch (i18n.language) {
            case 'zh-CN':
                return <>
                    {time.getFullYear()}年{formatMonth(time, true)}{time.getDate()}日
                </>
            case 'vi-VN':
                return <>
                    Ngày {time.getDate()}, {formatMonth(time)}, {time.getFullYear()}
                </>
            case 'th-TH':
                return <>
                    {time.getDate()} {formatMonth(time)} {time.getFullYear() + 543}
                </>
            case 'en-US':
                return <>
                    {time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)} {time.getFullYear()}
                </>
            case 'ko-KR':
                return <>
                    {time.getFullYear()}년 {formatMonth(time, true)} {time.getDate()}일
                </>
            case 'id-ID':
                return <>
                    {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                </>
            default:
                return <>
                    {time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)} {time.getFullYear()}
                </>

        }
    }
    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return <>
            {formatAMPM(time)}
        </>
    }

    if (!dateData) return null

    return (
        <h3 className="bn-date">
            <span className='date'>
                {dateForm(startDate)} - {dateForm(endDate)}
            </span>
            <div className="date-bg"></div>
            <span className='time'>
                {timeForm(startDate)} - {timeForm(endDate)}
                <span className='gmt'>(GMT+{GMT})</span>
            </span>
        </h3>
    )
}

export default DateHeading
