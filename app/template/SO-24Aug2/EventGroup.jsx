
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM } from "@/service/util";
import { useEffect, useState } from "react";
import i18n from '@/service/i18n';
import tire from './assets/images/deco/img_tire.webp'

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
        return `${date.getMonth() + 1}/${date.getDate()}`
    }

    const time_template = (timeStr, gmt = false) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)} ${[gmt ? `[GMT+${GMT}]` : ""]}`
    }
    const year_template = (timeStr) => {
        const date = new Date(timeStr);
        return date.getFullYear()
    }

    return (
        <div className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <img className="tire" src={tire} alt="" />
                    <strong className="date-item-year">{ i18n.language === 'th-TH' ? year_template(item.startDate) + 543 : year_template(item.startDate)}</strong>
                    <strong className="date-item-time">{date_template(item.startDate)} - {date_template(item.endDate)}</strong>
                    <strong className="date-item-date">{time_template(item.startDate)} - {time_template(item.endDate, true)}</strong>
                </div>
            ))}
        </div>
    )
}

export default EventGroup