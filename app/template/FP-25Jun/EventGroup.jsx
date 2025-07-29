import { t } from "i18next"
import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const DateItem = ({ active, index, data, GMT }) => {
    const { isMobile } = RWD()
    const [disable, setDisable] = useState(false)

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

    useEffect(() => {
        if (checkExpired(data.endDate)) {
            setDisable(true)
        }
    }, [])

    return (
        <div data-aos="show-out" data-aos-offset={isMobile ? '-300' : '0'}
            style={{ animationDelay: `${index * 0.1}s` }} className={`date-item ${active ? 'active' : ''} ${disable ? 'disable' : ''}`}>
            <div className="list-order">
                <span>{t('Round')}</span>
                <span className="number">{index + 1}</span>
            </div>

            <div className="date-content">
                <DateItemBox timeStr={data.startDate} />
                -
                <DateItemBox timeStr={data.endDate} />
            </div>
            <div className="time-content">
                <div className="time">
                    {timeForm(data.startDate)}
                    <span className="time-dash">-</span>
                    {timeForm(data.endDate)}
                    <div className="gmt">( GMT+{GMT} )</div>
                </div>
            </div>
        </div>
    )
}
const Tab = ({ status, i, handelClick }) => {
    const { isMobile } = RWD();

    return (
        <button className={`tournament-tab ${status} ${isMobile ? 'mobile' : ''}`}
            onClick={() => (status !== 'disable') && handelClick(i)}>
            <strong className="heading">{t('TournamentTitle', { i: i + 1 })}</strong>
            {status === 'disable' && <div className="disable-mask">{t('Disable')}</div>}
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
        setActiveEvent({ ...activeEvent, group: i })
    }

    const renderTab = (group, i) => {
        let status = ''
        if (activeEvent.index[0] > i) status = 'disable';
        if (activeEvent.group == i) status = 'active';
        return <Tab key={i} status={status} data={group} i={i} handelClick={changeTab} />
    }

    const handleSlideChange = (swiper) => {
        setActiveEvent({ ...activeEvent, group: Math.floor((swiper.realIndex) / 5) })
    };


    if (!eventList) return null

    return (
        <div className="tournament-block">
            {!isMobile && <>
                <div className="tournament-nav" >
                    {eventList.map((group, i) => (
                        renderTab(group, i)
                    ))}
                </div>
                {eventList.map((group, i) => (
                    <Fragment key={i} >
                        {isMobile && renderTab(group, i)}
                        <div className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}
                    ${(activeEvent.index[0] > i) ? 'disable' : ''}`}>
                            <div className="tournament-item">
                                {group.map((item, index) => (
                                    <DateItem key={index} index={index} data={item}
                                        active={activeEvent.index[0] == i && activeEvent.index[1] == index} GMT={GMT} />
                                ))}
                            </div>
                        </div>
                    </Fragment>
                ))}
            </>}
            {isMobile && <>
                <div className={`tournament-tab active`}>
                    <strong className="heading">
                        {t('TournamentTitle', { i: activeEvent.group + 1})}
                    </strong>
                </div>
                <Swiper
                    loop={true}
                    slidesPerView={2}
                    centeredSlides={true}
                    spaceBetween={15}
                    navigation={{
                        prevEl: '.button-prev',
                        nextEl: '.button-next'
                    }}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => { swiper.slideToLoop(0) }}
                    modules={[Navigation]}
                    className={`tournament-content`}
                >
                    {eventList.flat().map((item, index) => (
                        <SwiperSlide key={index} className={`swiper-slide ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            <DateItem
                                index={index}
                                data={item}
                                active={activeEvent.index[0] == 0 && activeEvent.index[1] == index}
                                GMT={GMT}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="button-prev"></button>
                <button className="button-next"></button>
            </>}
        </div>
    )
}

export default EventGroup