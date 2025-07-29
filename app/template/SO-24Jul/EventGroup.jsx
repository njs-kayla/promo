
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM, getPublicImage } from "@/service/util";
import { useEffect, useState } from "react";
import i18n from '@/service/i18n';

const light = getPublicImage(import.meta.url, 'deco/light_mini.webp');

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

    const time_template = (timeStr, gmt = false) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)} ${[gmt ? "[GMT+8]" : ""]}`
    }
    const year_template = (timeStr) => {
        const date = new Date(timeStr);
        return date.getFullYear()
    }

    return (
        <div data-aos="fade-up" data-aos-duration="800" className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    {activeEvent == i && <div className="light-mini">
                        <img src={light} />
                    </div>}
                    <strong className="date-item-year">{ i18n.language === 'th-TH' ? year_template(item.startDate) + 543 : year_template(item.startDate)}</strong>
                    <strong className="date-item-time">{date_template(item.startDate)} - {date_template(item.endDate)}</strong>
                    <strong className="date-item-date">{time_template(item.startDate)} - {time_template(item.endDate, true)}</strong>
                </div>
            ))}
        </div>
    )
}

export default EventGroup