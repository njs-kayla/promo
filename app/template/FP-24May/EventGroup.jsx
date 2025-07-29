import i18n from '@/service/i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import coconut from './assets/images/deco/coconut.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import { checkExpired, getOrdinalSuffix, formatAMPM } from '@/service/util';

const EventGroup = ({ eventList }) => {
    const { isMobile } = RWD();
    const [ activeEvent, setActiveEvent ] = useState(null);

    useEffect(() => {
        init()
    }, [eventList])

    const init = () => {
        let activeIndex = 0;
        eventList.map(item => {
            if (checkExpired(item.endDate)) activeIndex += 1;
        })
        setActiveEvent(activeIndex);
    }

    const dateForm = (date) => new Date(date).toLocaleString(i18n.language, {
        month: '2-digit',
        day: '2-digit'
    });
    const timeForm = (date) => {
        const dateObj = new Date(date);
        return formatAMPM(dateObj).toLowerCase().replace(" ", "")
    }


    if (eventList.length < 0) return null;

    return activeEvent !== null && (
        <div className='tournament-block'>
            <Swiper
                loop
                initialSlide={activeEvent}
                modules={[Navigation, Pagination, Grid]}
                slidesPerView={isMobile ? 2 : 4}
                slidesPerGroup={isMobile ? 2 : 4}
                spaceBetween={isMobile ? 10 : 20}
                grid={isMobile && { 
                    rows: 2,
                    fill: 'row'
                }}
                pagination={isMobile && {
                    clickable: true,
                    clickableClass: "custom-pagination"
                }}
                navigation={!isMobile && {
                    prevEl: '.button-prev',
                    nextEl: '.button-next'
                }}
            >
                {eventList.map((item, i) => (
                    <SwiperSlide key={i} className={`date-item ${(activeEvent == i) ? 'active' : ''}`}>
                        { !isMobile && <img className='coconut' src={coconut} alt="" />}
                        <div className="content">
                            <span className="list-order">{i + 1}{getOrdinalSuffix(i + 1)}</span>
                            <strong className="date-item-date">
                                {dateForm(item.startDate)} ~ {dateForm(item.endDate)}
                            </strong>
                            <strong className='date-item-time'>
                                {timeForm(item.startDate)} ~ {timeForm(item.endDate)}
                            </strong>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {!isMobile && <>
                <div className="button-prev"><i></i></div>
                <div className="button-next"><i></i></div>
            </>}
        </div>
    )
}

export default EventGroup