import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import { checkExpired, getOrdinalSuffix } from '@/service/util';
import bg from './assets/images/bg/img_dateBG.webp'

const EventGroup = ({ eventList }) => {
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

    const dateForm = (date) => new Date(date).getMonth() + 1 + ' / ' + new Date(date).getDate();

    if (!eventList || !activeEvent) return null;

    return (
        <div className='tournament-block'>
            <Swiper
                loop
                initialSlide={(activeEvent + 1) / (isMobile ? 4 : 1)}
                modules={[Navigation, Pagination, Grid]}
                slidesPerView={isMobile ? 2 : 4}
                slidesPerGroup={isMobile ? 2 : 4}
                spaceBetween={isMobile ? 10 : 20}
                grid={isMobile && { rows: 2 }}
                pagination={isMobile && {
                    clickable: true,
                }}
                navigation={!isMobile && {
                    prevEl: '.button-prev',
                    nextEl: '.button-next'
                }}
            >
                {eventList.map((item, i) => (
                    <SwiperSlide key={i} className={`date-item ${(activeEvent == i) ? 'active' : ''}`}>
                        <img src={bg} />
                        <span className="list-order">{i + 1}{getOrdinalSuffix(i + 1)}</span>
                        <strong className="date-item-time">
                            {dateForm(item.startDate)} ~ {dateForm(item.endDate)}
                        </strong>
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