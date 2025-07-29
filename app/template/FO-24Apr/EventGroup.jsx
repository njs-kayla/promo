import { checkExpired, formatMonth} from "@/service/util";
import activeImg from './assets/images/deco/pc_time.webp'


const Tournament = ({ eventList }) => {
    const tournamentList = eventList[0];

    const dateTemplate = (timeStr) => {
        let time = new Date(timeStr);
        let dateString = (
            <span className="gradient">
                {time.getDate()} {formatMonth(time)}
            </span>
        );

        return dateString;
    }
    // console.log(tournamentList);

    const timeTemplate = (timeStr) => (
        new Date(timeStr).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    );

    let activeIndex = 0;

    return (
        <div className="event-list">
            {tournamentList.map((item, i) => {
                let timeRangeStr = timeTemplate(item.startDate) + ' - ' + timeTemplate(item.endDate);
                const isExpired = checkExpired(item.endDate);
                
                if (isExpired) {
                    activeIndex += 1;
                }
                const isActive = (activeIndex === i);

                return (
                    <div key={i} className={`event-box ${isExpired ? 'expired' : ''} ${isActive ? 'active' : ''}`}>
                        <img className="active-img" src={activeImg} alt="" />
                        <div className="event-content">
                            <strong className="date">
                                {dateTemplate(item.startDate)}
                                <span className="triangle"></span>
                                {dateTemplate(item.endDate)}
                            </strong>
                            <strong className="time">{timeRangeStr}</strong>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const EventGroup = ({ dateData }) => {
    if (!dateData) return null;
    
    return (
        <div className="event-block">
            <Tournament eventList={dateData} />
        </div>
    );
}

export default EventGroup;