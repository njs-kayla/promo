
import RWD from "@/service/RWD"
import { checkExpired, datePad } from "@/service/util";
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
        return `${date.getMonth() + 1}/${date.getDate()}`
    }

    const time_template = (timeStr) => {
        const date = new Date(timeStr);
        return `${datePad(date.getHours())}:${datePad(date.getMinutes())}`
    }

    if (!eventList || !activeEvent) return null;

    return (
        <div className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <strong className="date-item-time">{date_template(item.startDate)} ~ {date_template(item.endDate)}</strong>
                    <strong className="date-item-date">{time_template(item.startDate)} ~ {time_template(item.endDate)}</strong>
                </div>
            ))}
        </div>
    )
}

export default EventGroup