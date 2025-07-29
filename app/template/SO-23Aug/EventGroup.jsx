import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import i18n from "@/service/i18n";

const DateItem = ({ active, index, data }) => {
    const { isMobile } = RWD()

    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <div className="date-item-box">
                <div className="date">{datePad(time.getMonth() + 1)} / {datePad(time.getDate())}</div>
            </div>
        )
    }

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return formatAMPM(time)
    }

    return (
        <div className={`event-item ${active ? 'active' : ''}`}>
            <strong className="date">
                <DateItemBox timeStr={data.startDate} /> - <DateItemBox timeStr={data.endDate} />
            </strong>

            <span className="list-order">{t('Round')} {index + 1}</span>
            <span className="time">12:00 - 11:59</span>
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