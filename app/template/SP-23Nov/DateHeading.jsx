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
        <h3 className="bn-date">
            {timeForm(startDate)} - {timeForm(endDate)}
            &nbsp;<span className="gmt">[GMT+8]</span>
        </h3>
    )
}

export default DateHeading
