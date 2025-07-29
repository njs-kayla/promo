import i18n from '@/service/i18n';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import RWD from '@/service/RWD';

const DateHeading = ({ dateData, GMT }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1];
    const { isMobile } = RWD()


    const timeForm = (timeStr, display = true) => {
        const time = new Date(timeStr)
        switch (i18n.language) {
            case 'zh-CN':
                return isMobile ? <>
                    {display && (time.getFullYear() + "年")}
                    <strong>{formatMonth(time, true)} {time.getDate()} 日</strong>
                    {formatAMPM(time)}

                </> : <>
                    {time.getFullYear()} 年 <strong>{formatMonth(time, true)} {time.getDate()} 日</strong> {formatAMPM(time)}
                </>
            case 'vi-VN':
                return isMobile ? <>
                    <strong>Ngày {time.getDate()}, {formatMonth(time)}</strong>,
                    {display && time.getFullYear()} {formatAMPM(time)}
                </> : <>
                    <strong>Ngày {time.getDate()}, {formatMonth(time)}</strong>, {time.getFullYear()} {formatAMPM(time)}
                </>
            case 'th-TH':
                return isMobile ? <>
                    <strong>{time.getDate()} {formatMonth(time, true)}</strong>
                    {display && (time.getFullYear() + 543)} {formatAMPM(time)}
                </> : <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong> {time.getFullYear() + 543} {formatAMPM(time)}
                </>
            case 'en-US':
                return isMobile ? <>
                    <strong>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time, true)}</strong> {display && time.getFullYear()} {formatAMPM(time)}
                </> : <>
                    <strong>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}</strong> {time.getFullYear()} {formatAMPM(time)}
                </>
            case 'ko-KR':
                return isMobile ? <>
                    {display && (time.getFullYear() + "년")}
                    <strong>{formatMonth(time, true)} {time.getDate()}일</strong> {formatAMPM(time)}
                </> : <>
                    {time.getFullYear()}년 <strong>{formatMonth(time, true)} {time.getDate()}일</strong> {formatAMPM(time)}
                </>
            case 'id-ID':
                return isMobile ? <>
                    <strong>{time.getDate()} {formatMonth(time, true)}</strong> {display && time.getFullYear()} {formatAMPM(time)}
                </> : <>
                    <strong>{time.getDate()} {formatMonth(time)}</strong> {time.getFullYear()} {formatAMPM(time)}
                </>
            default:
                return isMobile ? <>
                    <strong>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time, true)}</strong> {display && time.getFullYear()} {formatAMPM(time)}
                </> : <>
                    <strong>{time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}</strong> {time.getFullYear()} {formatAMPM(time)}
                </>

        }
    }

    if (!dateData) return null

    return (
        <>
            <h3 className="bn-date">
                <span className='bn-date-time'>
                    {timeForm(startDate)} - {timeForm(endDate, false)}
                </span>
                <span className="gmt">( GMT+{ GMT } )</span>
            </h3>
            <span className='text-background'></span>
        </>
    )
}

export default DateHeading
