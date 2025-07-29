import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix } from "@/service/util";
import { Fragment, useEffect, useState, useRef } from "react";
import i18n from "@/service/i18n";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import arrow from './assets/images/deco/arrow.svg'
import 'swiper/css';
import 'swiper/css/navigation';

const DateItem = ({ active, index, data, GMT }) => {
    const [disable, setDisable] = useState(false);

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
    )
}
const Tab = ({ status, data, i, handelClick, hasMultiple }) => {
    const { isMobile } = RWD();

    return (
        <button className={`tournament-tab ${status} ${isMobile ? 'mobile' : ''}`}
            onClick={() => (status != 'disable') && handelClick(i)}>
            {status === 'disable' ? <div className="disable-mask">{t('Disable')}</div>
                : <strong className="heading">
                    {hasMultiple ? t('TournamentTitle', { i: i + 1 }) : t('Tournament')}
                  </strong>}
        </button>
    )
}

const EventGroup = ({ eventList, GMT }) => {
    const { isMobile } = RWD();
    const [activeEvent, setActiveEvent] = useState({ group: 0, index: [0, 0] });
    const swiperRef = useRef(null);

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
                        <SwiperSlide key={i}>
                            {renderTab(group, i, eventList.length > 1)}
                        </SwiperSlide>
                    ))}
                    <div className="button-prev"><img src={arrow} alt="" /></div>
                    <div className="button-next"><img src={arrow} alt="" /></div>
                </Swiper>
            </>}
            {eventList.map((group, i) => (
                !isMobile ? <Fragment key={i} >
                    <div className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                ${(activeEvent.index[0] > i) ? 'disable' : ''}`}>
                        <div className={`tournament-item ${group.length > 4 ? 'small-item' : ''}`}>
                            {group.map((item, index) => (
                                <DateItem key={index} index={index} data={item}
                                    active={activeEvent.index[0] == i && activeEvent.index[1] == index} GMT={GMT} />
                            ))}
                        </div>
                    </div>
                </Fragment> : <>
                    <Swiper
                        slidesPerView="auto"
                        centeredSlides={true}
                        spaceBetween={5}
                        ref={swiperRef}
                        observer={true}
                        observeParents={true}
                        className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                         ${(activeEvent.index[0] > i) ? 'disable' : ''}`}
                    >
                        {group.map((item, index) => (
                            <SwiperSlide
                                className="date-item-wrap"
                                key={index}
                            >
                                <DateItem key={item.startDate} index={index} data={item}
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