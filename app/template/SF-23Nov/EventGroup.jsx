import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import close_img from './assets/images/img_treasureChest_black.png'
import open_img from './assets/images/img_treasureChest.png'
import { checkExpired, getOrdinalSuffix } from '@/service/util';
import { t } from 'i18next'

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
        <div className='tournament-main'>
            {eventList.map((item, i) => (
                <div key={i} className={`date-item ${activeEvent == i ? 'active' : ''}`}>
                    <img id="close" src={close_img} />
                    <img id="open" src={open_img} />
                    <strong className="date-item-time">{dateForm(item.startDate)} - {dateForm(item.endDate)}</strong>
                    <span className="list-order">{t('Round')} {i + 1}</span>
                </div>
            ))}
        </div>
    )
}

export default EventGroup