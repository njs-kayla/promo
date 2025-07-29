import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import i18n from "@/service/i18n";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const DateItem = ({ active, index, data, changeTab, GMT }) => {
    const { isMobile } = RWD()
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        if (checkExpired(data.endDate)) {
            setDisable(true)
        }
    }, [])

    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <div className="date-item-box">
                <div className="date">{datePad(time.getMonth() + 1)}/{datePad(time.getDate())}</div>
            </div>
        )
    }

    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return formatAMPM(time)
    }

    return (
        <div className={`date-item ${active ? 'active' : ''} ${disable ? 'disable' : ''}`}>
            <div className="list-order">
                <span className="round">{t('Round')} </span>
                <div className="number">{index + 1}</div>
            </div>

            <div className="date-content">
                <div className="date">
                    <DateItemBox timeStr={data.startDate} />
                    <span className="date-dash">-</span>
                    <DateItemBox timeStr={data.endDate} />
                </div>
                <div className="time">
                    <span className="time">{timeForm(data.startDate)} - {timeForm(data.endDate)}</span>
                    <span className="gmt">(GMT+{GMT})</span>
                </div>
            </div>
        </div>
    )
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
                return <>{time.getDate()}<strong>{getOrdinalSuffix(time.getDate())}</strong> {formatMonth(time)}. {time.getFullYear()}</>
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

const EventGroup = ({ eventList, GMT }) => {
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
        if (isMobile) return;
        setActiveEvent({ ...activeEvent, group: i })
    }

    const renderTab = (group, i) => {
        let status = ''
        if (activeEvent.index[0] > i) status = 'disable';
        if (activeEvent.group == i) status = 'active';
        return <Tab key={i} status={status} data={group} i={i} handelClick={changeTab} />
    }

    const handleSlideChange = (swiper) => {
        const newGroupIndex = swiper.realIndex;
        setActiveEvent({ ...activeEvent, group: newGroupIndex });
    }

    if (!eventList) return null

    return (
        <div className="tournament-block">
            {!isMobile ? <>
                <div className="tournament-nav" >
                    {eventList.map((group, i) => (
                        renderTab(group, i)
                    ))}
                </div>
            </> : <>
                <Swiper
                    centeredSlides={true}
                    loop
                    className="tournament-nav"
                    onSlideChange={handleSlideChange}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.button-prev',
                        nextEl: '.button-next'
                    }}
                >

                    {eventList.map((group, i) => (
                        <SwiperSlide
                            key={i}
                        >
                            {renderTab(group, i)}
                        </SwiperSlide>
                    ))}
                    <div className="button-prev"><span class="icon-target"></span></div>
                    <div className="button-next"><span class="icon-target"></span></div>
                </Swiper>
            </>}
            {eventList.map((group, i) => (
                !isMobile ? <Fragment key={i} >
                    <div className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                ${(activeEvent.index[0] > i) ? 'disable' : ''}`}>
                        <div className="tournament-item">
                            {group.map((item, index) => (
                                <DateItem key={index} index={index} data={item}
                                    active={activeEvent.index[0] == i && activeEvent.index[1] == index} GMT={GMT} />
                            ))}
                        </div>
                    </div>
                </Fragment> : <>
                    <Swiper
                        slidesPerView={2.5}
                        className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                         ${(activeEvent.index[0] > i) ? 'disable' : ''}`}
                    >
                        {group.map((item, index) => (
                            <SwiperSlide
                                key={index}
                            >
                                <DateItem key={index} index={index} data={item}
                                    active={activeEvent.index[0] == i && activeEvent.index[1] == index} GMT={GMT} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )
            )}

        </div>
    )
}

export default EventGroup