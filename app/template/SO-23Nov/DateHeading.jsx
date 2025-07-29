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
                    {time.getFullYear()} 年 <strong>{formatMonth(time, true)} {time.getDate()} 日</strong>
                </>
            case 'vi-VN':
                return <>
                    <strong>Ngày {time.getDate()}, {formatMonth(time)}</strong>, {time.getFullYear()}
                </>
            case 'th-TH':
                return <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong> {time.getFullYear() + 543}
                </>
            case 'en-US':
                return <>
                    <strong>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}</strong> {time.getFullYear()}
                </>
            case 'ko-KR':
                return <>
                    {time.getFullYear()}년 <strong>{formatMonth(time, true)} {time.getDate()}일</strong>
                </>
            default:
                return <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong> {time.getFullYear()}
                </>

        }
    }

    if (!dateData) return null

    return (
        <h3 className="heading-date">
            <strong>
                {timeForm(startDate)} - {timeForm(endDate)}
            </strong>&nbsp;
            <span className="gmt">(GMT+8)</span>
        </h3>
    )
}

export default DateHeading
