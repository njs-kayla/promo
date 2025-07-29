
import RWD from "@/service/RWD"
import { checkExpired, formatAMPM } from "@/service/util";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const EventGroup = ({ eventList }) => {
    const { isMobile } = RWD();
    const [disableEvent, setdisableEvent] = useState(0);

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        let activeIndex = 0
        eventList.map((item, i) => {
            if (checkExpired(item.endDate)) activeIndex += 1;
        })
        setdisableEvent(activeIndex)
    }

    const date_template = (timeStr) => {
        const date = new Date(timeStr);
        let formatMonth = ("0" + (date.getMonth() + 1)).slice(-2)
        let formatDate = ("0" + date.getDate()).slice(-2)
        return `${formatMonth}/${formatDate}`
    }

    const time_template = (timeStr, gmt = false) => {
        const date = new Date(timeStr);
        return formatAMPM(date)
    }

    return (
        <div className="info-block">
            {!isMobile ? <div className="tournament-main">
                {eventList.map((item, i) => (
                    <div key={i} className={`date-item ${disableEvent > i ? 'disable' : ''}`} >
                        <div className="date-item-head">
                            <strong className="date-item-time">{time_template(item.startDate)} - {time_template(item.endDate, true)}</strong>
                        </div>
                        <strong className="date-item-date">
                            <span>{date_template(item.startDate)} </span>
                            <span>~</span>
                            <span>{date_template(item.endDate)}</span>
                        </strong>
                    </div>
                ))}
            </div> :
                <Swiper
                    loop
                    slidesPerView={2}
                    spaceBetween={10}
                    className="tournament-main"
                    initialSlide={disableEvent}
                >
                    {eventList.map((item, i) => (
                        <SwiperSlide
                            key={i} className={`date-item ${disableEvent > i ? 'disable' : ''}`}
                        >
                            <div className="date-item-head">
                                <strong className="date-item-time">{time_template(item.startDate)} - {time_template(item.endDate, true)}</strong>
                            </div>
                            <strong className="date-item-date">
                                <span>{date_template(item.startDate)} </span>
                                <span>~</span>
                                <span>{date_template(item.endDate)}</span>
                            </strong>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    )
}

export default EventGroup