import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import dia from './assets/images/dia.webp'

const DateItem = ({ active, index, data }) => {
    const { isMobile } = RWD()

    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <>{time.getMonth() + 1}/{time.getDate()}</>
        )
    }

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return time.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    return (
        <div className={`event-item ${active ? 'active' : ''}`}>
            <img className="dia" src={dia} alt="" />
            <strong className="date">
                <DateItemBox timeStr={data.startDate} />-<DateItemBox timeStr={data.endDate} />
            </strong>
            <strong className="time">{timeForm(data.startDate)} - {timeForm(data.endDate)} GMT+8</strong>
        </div>)
}


const EventGroup = ({ eventList }) => {
    const { isMobile } = RWD();
    const [activeEvent, setActiveEvent] = useState({ group: 0, index: [0, 0] });

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        let activeIndex = [0, 0]
        eventList.map((group, i) => {
            if (checkExpired(group[group.length - 1].endDate)) {
                if (i != eventList.length - 1)
                    activeIndex[0] += 1
            } else {
                group.map((item) => {
                    if (checkExpired(item.endDate)) activeIndex[1] += 1;
                })
            }
        })
        setActiveEvent({ group: activeIndex[0], index: activeIndex })
    }

    if (!eventList) return null

    return (
        <div className="tournament-main">
            {eventList.map((group, i) => (
                <Fragment key={i} >
                    {group.map((item, index) => (
                        <DateItem key={index} index={index} data={item}
                        active={activeEvent.index[0] == i && activeEvent.index[1] == index} />
                    ))}
                </Fragment>
            ))}
        </div>
    )
}

export default EventGroup