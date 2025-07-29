import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import i18n from "@/service/i18n";

const DateItem = ({ active, index, data }) => {
    const { isMobile } = RWD()
    const [ disable, setDisable ] = useState(false)

    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <div className="date-item-box">
                <div className="date">{datePad(time.getMonth() + 1)} / {datePad(time.getDate())}</div>
                {isMobile && <>
                    <div className="time">
                        {formatAMPM(time)}
                    </div>
                </>}
            </div>
        )
    }

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return formatAMPM(time)
    }

    useEffect(() => {
        if (checkExpired(data.endDate)) {
            setDisable(true)
        }
    }, [])

    return (
        <div className={`date-item ${active ? 'active-date' : ''} ${disable ? 'disable' : ''}`}>
            <div className="list-order">
                <span className="round">
                    {!isMobile && t('Round')}
                    <div className="number">{index + 1}</div>
                </span>
                {!isMobile &&
                    <span className="time">{timeForm(data.startDate)} - {timeForm(data.endDate)}</span>}
            </div>

            <div className="date-content">
                <DateItemBox timeStr={data.startDate} />
                <span className="date-dash">~</span>
                <DateItemBox timeStr={data.endDate} />
            </div>
        </div>
    )
}

const Tab = ({ status, data, i, handelClick }) => {
    const { isMobile } = RWD();


    const timeForm = (timeStr) => {
        const time = new Date(timeStr);
        const year = i18n.language === 'th-TH' ? time.getFullYear() + 543 : time.getFullYear();
        const month = String(time.getMonth() + 1).padStart(2, '0');
        const day = String(time.getDate()).padStart(2, '0');
        return `${year} / ${month} / ${day}`;
    }

    return (
        <button className={`tournament-tab ${status} ${isMobile ? 'mobile' : ''}`}
            onClick={() => (status != 'disable') && handelClick(i)}>
            <strong className="heading">{t('TournamentTitle', { i: i + 1 })}</strong>
            {status === 'disable' ? <div className="disable-mask">{t('Disable')}</div> :
                <div className="date-box">
                    <div className="date">
                        <span>{timeForm(data[0].startDate)}</span>
                    </div>
                    <span className="triangle"></span>
                    <div className="date">
                        <span>{timeForm(data[data.length - 1].endDate)}</span>
                    </div>
                </div>}
        </button>
    )
}

const EventGroup = ({ eventList, info }) => {
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

    const changeTab = (i) => {
        setActiveEvent({ ...activeEvent, group: i })
    }

    const renderTab = (group, i) => {
        let status = ''
        if (activeEvent.index[0] > i) status = 'disable';
        if (activeEvent.group == i) status = 'active';
        return <Tab key={i} status={status} data={group} i={i} handelClick={changeTab} />
    }


    if (!eventList) return null

    return (
        <div className="tournament-block">
            {!isMobile && <>
                <span className="event-deco"></span>
                <div className="tournament-nav" >
                    {eventList.map((group, i) => (
                        renderTab(group, i)
                    ))}
                </div>
            </>}
            {eventList.map((group, i) => (
                <Fragment key={i} >
                    {isMobile && renderTab(group, i)}
                    <div className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                    ${(activeEvent.index[0] > i) ? 'disable' : ''}`}>
                        {isMobile && <div className="tournament-item-gmt">(GMT+8)</div>}
                        <div className="tournament-item">
                            {group.map((item, index) => (
                                <DateItem key={index} index={index} data={item}
                                    active={activeEvent.index[0] == i && activeEvent.index[1] == index} />
                            ))}
                        </div>
                    </div>
                </Fragment>
            ))}
            <div className="tournament-text">
                {isMobile && <div className="event-rules">{t('EventRules')}</div>}
                <div className="tournament-info" dangerouslySetInnerHTML={{ __html: info }}></div>
            </div>
        </div>
    )
}

export default EventGroup