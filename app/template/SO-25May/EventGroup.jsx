
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM, formatMonth } from "@/service/util";
import { useEffect, useState } from "react";
import i18n from '@/service/i18n';
import dice from './assets/images/deco/dice.webp';


const EventGroup = ({ eventList, GMT }) => {
    const { isMobile } = RWD();
    const [activeEvent, setActiveEvent] = useState(null);
    const [headingElem, setHeadingElem] = useState(null);

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

    const date_time_template = (timeStr) => {
        const date = new Date(timeStr);
        return (
            <>
                {date.getDate()} {formatMonth(date)} {formatAMPM(date)}
            </>
        );
    };
    const date_template = (timeStr) => {
        const date = new Date(timeStr);
        return (
            <>
                {date.getDate()} {formatMonth(date)}
            </>
        );
    };

    const time_template = (timeStr) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)}`
    }

    return isMobile ? (
        <>
            <div className="tournament-main">
                {eventList.map((item, i) => (
                    <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                        <div className="dice">
                            <img src={dice} alt="" />
                        </div>
                        <strong className="date-item-date">{date_template(item.startDate)} <span className="slash">-</span> {date_template(item.endDate)}</strong>
                    </div>
                ))}
            </div>
            <strong className="date-item-time">
                {time_template(eventList[0].startDate)} - {time_template(eventList[0].endDate)}
                <span className="gmt">(GMT+{GMT})</span>
            </strong>
        </>
    ) : (
        <div className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <div className="dice">
                        <img src={dice} alt="" />
                    </div>
                    <strong className="date-item-date">{date_time_template(item.startDate)} <span className="slash">-</span> {date_time_template(item.endDate)}</strong>
                    <span className="gmt">(GMT+{GMT})</span>
                </div>
            ))}
        </div>
    )
}

export default EventGroup