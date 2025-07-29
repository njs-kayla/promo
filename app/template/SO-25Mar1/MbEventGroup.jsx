import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import arrow from './assets/images/deco/target.webp';
import { checkExpired, formatAMPM } from "@/service/util";

const MbEventGroup = ({eventList}) => {
    const [activeEvent, setActiveEvent] = useState(null);

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

    const date_template = (timeStr) => {
        const date = new Date(timeStr);
        return (
            <>
                {date.getMonth() + 1}
                <span className="slash">/</span>
                {date.getDate()}
            </>
        )
    }

    const time_template = (timeStr, gmt = false) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)}`
    }

    return (
        <Swiper
            loop={true}
            centeredSlides={true}
            modules={[Navigation]}
            className='tournament-main'
            navigation={{
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
            }}
        >
            {eventList.map((item, i) => (
                <SwiperSlide key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <strong className="date-item-date">{date_template(item.startDate)} <span className="slash">-</span> {date_template(item.endDate)}</strong>
                    <strong className="date-item-time">{time_template(item.startDate)} - {time_template(item.endDate, true)}</strong>
                </SwiperSlide>
            ))}
            <div className="arrow-prev">
                <img src={arrow} alt="" />
            </div>
            <div className="arrow-next">
                <img src={arrow} alt="" />
            </div>
        </Swiper>
    )
}

export default MbEventGroup;