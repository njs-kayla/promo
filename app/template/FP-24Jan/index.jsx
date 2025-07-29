import './assets/scss/app.scss';
import "../../assets/fonts/Sansita/style.css";
import api from "@/service/api";
import bg from './assets/images/banner_img/bg.webp';
import bg_deco from './assets/images/banner_img/title_character.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import CurrTable from '@/component/Promo/CurrTable';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import PointTable from '@/component/Promo/PointTable';
import { useSelector } from 'react-redux';
import Firework from './assets/js/firework'

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);

    useEffect(() => {
        parseContent();
        if (!isMobile) Firework();
    }, [pageData])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <main className={loading ? 'load-main' : ''}>
            {!isMobile && <>
                <canvas id="canvas" ></canvas>
                <img className="bg" src={bg} />
                <img className="deco-bg" src={bg_deco} />
            </>}
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : <>
                    <div className="bn-title">
                        <img src={HOST_URL + pageData.images.title} />
                    </div>
                    <div className="bn-money" style={{ '--imgUrl': `url(${HOST_URL + pageData.images.money})` }}>
                        <img src={HOST_URL + pageData.images.money} />
                    </div>
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <div className="event-block">
                        <EventGroup eventList={pageData.eventList} />
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                    </div>
                    <PointTable htmlString={sec[1]} />
                    <CurrTable htmlString={sec[sec.length - 1]} />
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;