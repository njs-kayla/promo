
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM, formatMonth } from "@/service/util";
import { useEffect, useState } from "react";
import i18n from '@/service/i18n';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const EventGroup = ({ eventList, GMT }) => {
    const { isMobile } = RWD();
    const [activeEvent, setActiveEvent] = useState(null);
    const [headingElem, setHeadingElem] = useState(null);

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
                {date.getDate()} {formatMonth(date)}
            </>
        );
    };

    const time_template = (timeStr) => {
        const date = new Date(timeStr);
        return `${formatAMPM(date)}`
    }

    return isMobile ? (
        <Swiper
            loop={true}
            navigation={{
                prevEl: '.button-prev',
                nextEl: '.button-next'
            }}
            slidesPerView={1}
            modules={[Navigation]}
            className="tournament-main">
            {eventList.map((item, i) => (
                <SwiperSlide key={i}>
                    <div className={`date-item ${activeEvent == i ? 'active' : ''}`}>
                        <strong className="date-item-date">{date_template(item.startDate)} <span className="slash">-</span> {date_template(item.endDate)}</strong>
                        <strong className="date-item-time">
                            {time_template(eventList[0].startDate)} - {time_template(eventList[0].endDate)}
                            <span className="gmt">(GMT+{GMT})</span>
                        </strong>
                    </div>
                </SwiperSlide>
            ))}
            <button className="button-prev"></button>
            <button className="button-next"></button>
        </Swiper>
    ) : (
        <div data-aos="fade-up" data-aos-duration="800" className="tournament-main">
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`} >
                    <strong className="date-item-date">{date_template(item.startDate)} <span className="slash">-</span> {date_template(item.endDate)}</strong>
                </div>
            ))}
            <strong className="date-item-time">
                {time_template(eventList[0].startDate)} - {time_template(eventList[0].endDate)}
                <span className="gmt">(GMT+{GMT})</span>
            </strong>
        </div>
    )
}

export default EventGroup