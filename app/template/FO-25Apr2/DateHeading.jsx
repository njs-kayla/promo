import { datePad } from '@/service/util';
import { formatAMPM, formatMonth, getOrdinalSuffix } from '@/service/util';
import i18n from '@/service/i18n';
import RWD from '@/service/RWD';

const DateHeading = ({ dateData, GMT }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1];
    const { isMobile } = RWD()

    const dateForm = (timeStr) => {
        const time = new Date(timeStr)
        switch (i18n.language) {
            case 'zh-CN':
                return <>
                    {time.getFullYear()}年{formatMonth(time, true)}{time.getDate()}日
                </>
            case 'vi-VN':
                return <>
                    {time.getDate()} {formatMonth(time).toLowerCase()} năm {time.getFullYear()}
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
                    {time.getDate()}{getOrdinalSuffix(time.getDate())} {formatMonth(time)}{time.getFullYear()}
                </>

        }
    }
    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return i18n.language === 'th-TH' ? <>
            {formatAMPM(time).replace(/ AM| PM/, '') + " น."}
        </> :  <>
            {formatAMPM(time)}
        </>
    }

    if (!dateData) return null

    return (
        <h3 className="bn-date" data-aos-offset='-300' data-aos="bounceInDown" style={{ animationDelay: '1600ms', opacity: isMobile ? 1 : 0 }}>
            <span className='date'>
                {dateForm(startDate)} - {dateForm(endDate)}
            </span>
            <span className='time'>
                {timeForm(startDate)} - {timeForm(endDate)}
                <span className='gmt'>(GMT + {GMT})</span>
            </span>
        </h3>
    )
}

export default DateHeading
