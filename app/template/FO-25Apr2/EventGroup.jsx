
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM, getOrdinalSuffix, formatMonth } from "@/service/util";
import { useEffect, useState } from "react";
import i18n from '@/service/i18n';

const EventGroup = ({ eventList, GMT }) => {
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
                <span>{date.getDate()}</span>
                <span>{formatMonth(date, true)}</span>
            </>
        )
    }

    const time_template = (timeStr, gmt = false) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)}`
    }

    return (
        <div className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 300} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <strong className="date-item-date">{date_template(item.startDate)} <span className="slash">-</span> {date_template(item.endDate)}</strong>
                    <strong className="date-item-time">{time_template(item.startDate)} - {time_template(item.endDate, true)} (GMT+{GMT})</strong>
                </div>
            ))}
        </div>
    )
}

export default EventGroup