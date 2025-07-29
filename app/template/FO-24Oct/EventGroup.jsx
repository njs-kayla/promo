import RWD from "@/service/RWD"
import { checkExpired, datePad, formatAMPM, formatMonth, getOrdinalSuffix, transformSa } from "@/service/util";
import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const DateItem = ({ active, index, data }) => {
    const { isMobile } = RWD()
    const [disable, setDisable] = useState(false)

    const DateItemBox = ({ timeStr }) => {
        const time = new Date(timeStr);
        return (
            <div className="date-item-box">{datePad(time.getMonth() + 1)} / {datePad(time.getDate())}</div>
        )
    }

    useEffect(() => {
        if (checkExpired(data.endDate)) {
            setDisable(true)
        }
    }, [])

    return (
        <div data-aos="show-out"
            style={{ animationDelay: `${index * 0.15}s` }} className={`date-item ${active ? 'active' : ''} ${disable ? 'disable' : ''}`}>
            <div className="date-content">
                <DateItemBox timeStr={data.startDate} />
                <span className="date-dash">~</span>
                <DateItemBox timeStr={data.endDate} />
            </div>
        </div>
    )
}

const TimeItem = ({ data, GMT }) => {
    const timeForm = (timeStr) => {
        const time = new Date(timeStr)
        return formatAMPM(time)
    }

    return (
        <div className="time-content">
            {timeForm(data.startDate)} - {timeForm(data.endDate)} (Gmt+{GMT})
        </div>
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


    if (!eventList) return null

    return (
        <div className="tournament-wrap">
            <div className="tournament-block">
                {eventList.map((group, i) => (
                    <Fragment key={i} >
                        <Swiper
                            loop={true}
                            slidesPerView={isMobile ? 2 : 5}
                            spaceBetween={0}
                            centeredSlides={isMobile ? true : false}
                            navigation={{
                                prevEl: '.button-prev',
                                nextEl: '.button-next'
                            }}
                            onSwiper={(swiper) => { swiper.slideToLoop(0) }}
                            modules={[Navigation]}
                            className={`tournament-content ${(activeEvent.group == i) ? 'active' : ''}`}>
                            {group.map((item, index) => (
                                <SwiperSlide>
                                    <DateItem key={index} index={index} data={item}
                                        active={activeEvent.index[0] == i && activeEvent.index[1] == index} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Fragment>
                ))}
                <TimeItem data={eventList[0][0]} GMT={GMT} />
            </div>
            <button className="button-prev"></button>
            <button className="button-next"></button>
        </div>
    )
}

export default EventGroup