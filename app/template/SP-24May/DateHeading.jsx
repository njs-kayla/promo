import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)

        switch (i18n.language) {
            case 'zh-CN':
                return <>
                    {time.getFullYear()} 年 <strong>{formatMonth(time, true)} {time.getDate()} 日</strong> {formatAMPM(time)}
                </>
            case 'vi-VN':
                return <>
                    <strong>Ngày {time.getDate()}, {formatMonth(time)}</strong>, {time.getFullYear()} {formatAMPM(time)}
                </>
            case 'th-TH':
                return <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong> {time.getFullYear() + 543} {formatAMPM(time)}
                </>
            case 'en-US':
                return <>
                    <strong>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}</strong> {time.getFullYear()} {formatAMPM(time)}
                </>
            case 'ko-KR':
                return <>
                    {time.getFullYear()}년 <strong>{formatMonth(time, true)} {time.getDate()}일</strong> {formatAMPM(time)}
                </>
            default:
                return <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong> {time.getFullYear()} {formatAMPM(time)}
                </>

        }
    }

    if (!dateData) return null

    return (
        <h3 className="bn-date">
            {timeForm(startDate)} - {timeForm(endDate)}
            <span className="gmt">( GMT+8 )</span>
        </h3>
    )
}

export default DateHeading
