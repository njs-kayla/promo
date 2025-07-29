
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM } from "@/service/util";
import { useEffect, useState } from "react";
import i18n from '@/service/i18n';

const EventGroup = ({ eventList }) => {
    const { isMobile } = RWD();
    const [activeEvent, setActiveEvent] = useState(null);

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        let activeIndex = 0
        eventList.map((item, i) => {
            if (checkExpired(item.endDate)) activeIndex += 1;
        })
        setActiveEvent(activeIndex)
    }

    const date_template = (timeStr) => {
        const date = new Date(timeStr);
        return (
            <>
                {date.getDate()}
                <span className="slash">/</span>
                {date.getMonth() + 1}
                <span className="slash">/</span>
                {i18n.language === 'th-TH' ? date.getFullYear() + 543 : date.getFullYear()}
            </>
        );
    };

    const time_template = (timeStr) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)}`
    }

    return (
        <div data-aos="fade-up" data-aos-duration="800" className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <strong className="date-item-date">{date_template(item.startDate)} <span className="slash">-</span> {date_template(item.endDate)}</strong>
                    <strong className="date-item-time">{time_template(item.startDate)} - {time_template(item.endDate)}</strong>
                </div>
            ))}
        </div>
    )
}

export default EventGroup