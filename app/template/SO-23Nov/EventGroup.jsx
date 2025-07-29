import dia from './assets/images/deco/dia.webp'
import RWD from "@/service/RWD"
import { checkExpired } from "@/service/util";
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

    if (!eventList || !activeEvent) return null;

    return (
        <div className="event-list">
            {eventList.map((item, i) => (
                <div key={i} className={`event-box ${activeEvent == i ? 'active' : ''}`} >
                    <img className="active-img" src={dia} />
                    <strong className="date">7/3 ~ 7/9</strong>
                    <strong className="time">00:00 ~ 23:59</strong>
                </div>
            ))}
        </div>
    )
}

export default EventGroup