import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import i18n from "@/service/i18n";

const DateItem = ({ active, index, data, changeTab }) => {
    const { isMobile } = RWD()

    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <div className="date-item-box">
                <div className="date">{datePad(time.getMonth() + 1)} / {datePad(time.getDate())}</div>
                {isMobile && <div className="time">{formatAMPM(time)}</div>}
            </div>
        )
    }

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return formatAMPM(time)
    }

    return (
        <div className={`date-item ${active ? 'active-date' : ''}`}>

            <div className="list-order">
                <span className="round">{t('Round')} </span>
                <div className="number">{index + 1}</div>
                {!isMobile &&
                    <span className="time">{timeForm(data.startDate)} - {timeForm(data.endDate)}</span>}
            </div>
            <DateItemBox timeStr={data.startDate} />
            <span className="date-dash">~</span>
            <DateItemBox timeStr={data.endDate} />
        </div>)
}

const Tab = ({ status, data, i, handelClick }) => {
    const { isMobile } = RWD();

    const timeForm = (timeStr) => {
        const time = new Date(timeStr);

        switch (i18n.language) {
            case 'zh-CN':
                return `${time.getFullYear()} 年 ${formatMonth(time, true)} ${time.getDate()} 日`
            case 'id-ID':
                return `${time.getDate()} ${formatMonth(time)} ${time.getFullYear()}`
            case 'th-TH':
                return `${time.getDate()} ${formatMonth(time)} ${time.getFullYear() + 543}`
            case 'ko-KR':
                return `${time.getFullYear()}년 ${formatMonth(time, true)} ${time.getDate()}일`
            default:
                return <>{time.getDate()}<sup>{getOrdinalSuffix(time.getDate())}</sup>{formatMonth(time, true)}. {time.getFullYear()}</>
        }
    }

    return (
        <button className={`tournament-tab ${status} ${isMobile ? 'mobile' : ''}`}
            onClick={() => (status != 'disable') && handelClick(i)}>
            <strong className="heading">{t('TournamentTitle', { i: i + 1 })}</strong>
            <div className="disable-mask">{t('Disable')}</div>
            <div className="date-box">
                <div className="date">
                    <span>{timeForm(data[0].startDate)}</span>
                </div>
                –
                <div className="date">
                    <span>{timeForm(data[data.length - 1].endDate)}</span>
                </div>
            </div>
        </button>
    )
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
            {!isMobile && <div className="tournament-nav" >
                {eventList.map((group, i) => (
                    renderTab(group, i)
                ))}
            </div>}
            {eventList.map((group, i) => (
                <Fragment key={i} >
                    {isMobile && renderTab(group, i)}
                    <div className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                    ${(activeEvent.index[0] > i) ? 'disable' : ''}`}>
                        <div className="tournament-item">
                            <span className="tournament-item-gmt">(GMT+8)</span>
                            {group.map((item, index) => (
                                <DateItem key={index} index={index} data={item}
                                    active={activeEvent.index[0] == i && activeEvent.index[1] == index} />
                            ))}
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

export default EventGroup