import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState } from "react";

const DateItem = ({ active, index, data }) => {
    const { isMobile } = RWD()


    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <div className="date-item-box">
                <div>{time.getMonth() + 1} / {time.getDate()}</div>
            </div>
        )
    }
    const Time = ({ timeStr }) => {
        const time = new Date(timeStr);
        let dateString = time.toLocaleString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        });
        let parts = dateString.split(' ');
        const timeString = (
            <>
                {parts[0] + " "}
                {parts[1]}
            </>
        )
        return timeString
    }


    return (
        <div className={`event-item ${active ? 'active' : ''}`}>
            <strong className="date">
                <DateItemBox timeStr={data.startDate} /> - <DateItemBox timeStr={data.endDate} />
            </strong>
            <span className="time">
                <Time timeStr={data.startDate} /> - <Time timeStr={data.endDate} />
            </span>
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