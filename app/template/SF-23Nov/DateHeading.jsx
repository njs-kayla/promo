import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const DateForm = (timeStr) => {
        const time = new Date(timeStr)

        switch (i18n.language) {
            case 'zh-CN':
                return <>
                    {time.getFullYear()} 年 {formatMonth(time, true)} {time.getDate()} 日
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
            default:
                return <>
                    {time.getDate()} {formatMonth(time)} {time.getFullYear()}
                </>

        }
    }

    if (!dateData) return null

    return (
        <>
            <div className="heading-date-box">
                {DateForm(startDate)} - {DateForm(endDate)}
            </div>
            <div className="tournament-time">
                {formatAMPM(new Date(startDate))} - {formatAMPM(new Date(endDate))} 
                &nbsp;<span className="gmt">[GMT+8]</span>
            </div>
        </>
    )
}

export default DateHeading
