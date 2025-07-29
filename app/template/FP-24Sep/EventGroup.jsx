
import RWD from "@/service/RWD"
import { checkExpired, getPublicImage } from "@/service/util";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { t } from "i18next";

const bg = getPublicImage(import.meta.url, 'deco/time_area.webp');
const bg_now = getPublicImage(import.meta.url, 'deco/time_area_now.webp');

const EventGroup = ({ eventList, themeType }) => {
    const { isMobile } = RWD();
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
        return `${date.getMonth() + 1}/${date.getDate()}`
    }

    const previewNumber = () => {
        if (isMobile && themeType !== 'A') {
            return 2
        } else if (isMobile && themeType !== 'B') {
            return 1.8
        } else if (!isMobile && themeType !== 'A') {
            return 2
        } else {
            return 4
        }
    }

    return (
        <div className="tournament-block">
            <Swiper
                className="tournament-main"
                loop
                slidesPerView={previewNumber()}
                spaceBetween={isMobile ? 0 : 15}
                centeredSlides={isMobile && themeType === 'A' ?  true : false}
                initialSlide={activeEvent + 1}
                modules={[Navigation]}
                navigation={{
                    prevEl: '.button-prev',
                    nextEl: '.button-next'
                }}
            >
                {eventList.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className={`date-item ${i % 2 === 0 && "even"} ${activeEvent == i ? 'active' : ''} ${activeEvent > i ? 'disable' : ''}`}>
                            <img className="date-item-bg" src={activeEvent == i ? bg_now : bg} alt="" />
                            <strong className="date-item-time">
                                { themeType === "C" && <span className="round">
                                    {t('Round')}
                                    <div className="number">{i + 1}</div>
                                </span>}
                                {date_template(item.startDate)} - {date_template(item.endDate)}
                            </strong>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {themeType === 'A' && <>
                <div className="button-prev"><i></i></div>
                <div className="button-next"><i></i></div>
            </>}
        </div>
    )
}

export default EventGroup