
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatMonth } from "@/service/util";
import { useEffect, useState } from "react";

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
        return `${date.getDate()} ${formatMonth(date, true)}`
    }

    const time_template = (timeStr) => {
        const date = new Date(timeStr);
        return `${datePad(date.getHours())}:${datePad(date.getMinutes())}`
    }

    if (!eventList || !activeEvent) return null;

    return (
        <div className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`event-item ${activeEvent == i ? 'active' : ''}`}
                    data-aos="fade-up" data-aos-delay={100 * i}>
                    <strong className="date">{date_template(item.startDate)} ~ {date_template(item.endDate)}</strong>
                    <div className="time-box">
                        <span className="gmt">GMT+8</span>
                        <strong className="time">{time_template(item.startDate)} ~ {time_template(item.endDate)}</strong>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventGroup