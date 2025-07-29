import RWD from '@/service/RWD';
import { formatMonth } from '@/service/util';

const DateHeading = ({ dateData }) => {
    const { isMobile } = RWD()
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const timeForm = (timeStr) => {
        const time = new Date(timeStr);
        return `${time.getDate()} ${formatMonth(time)} ${time.getFullYear()}`
    }

    if (!dateData) return null

    return (
        <h3 className="heading-date" data-aos="fade-up" data-aos-delay={isMobile ? "0" : "900"}>
            <strong>
                {timeForm(startDate)} - {timeForm(endDate)}
            </strong>&nbsp;
            <span className="gmt">[GMT + 8]</span>
        </h3>
    )
}

export default DateHeading
