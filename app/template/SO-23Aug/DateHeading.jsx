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
                    {formatMonth(time, true)} {time.getDate()}日
                </>
            case 'vi-VN':
                return <>
                    <strong>Ngày {time.getDate()}, {formatMonth(time)}</strong>
                </>
            case 'th-TH':
                return <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong>
                </>
            case 'en-US':
                return <>
                    <strong>{formatMonth(time)} {time.getDate()}{getOrdinalSuffix(time.getDate())}</strong>
                </>
            default:
                return <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong>
                </>

        }
    }

    if (!dateData) return null

    return (
        <h3 className="bn-date">
            {timeForm(startDate)} - {timeForm(endDate)}
            <span className="gmt">2024 (GMT+8)</span>
        </h3>
    )
}

export default DateHeading
