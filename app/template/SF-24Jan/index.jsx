import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import bg from "./assets/images/bg/img_TopBG.webp"
import { useEffect, useState } from 'react';
import api from '@/service/api';
import RWD from '@/service/RWD';
import CurrTable from '@/component/Promo/CurrTable';
import bubbles from './assets/js/bubbles'
import { htmlImg, mergedArray } from '@/service/util';
import MoreBtn from '@/component/Promo/MoreBtn';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
        if (!isMobile) bubbles();
    }, [pageData])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <>
            {!isMobile && <img className="top-bg" src={bg} />}
            <main>
                <canvas className="bubbles"></canvas>
                <section className="banner">
                    <img className='bn-bg' src={HOST_URL + (isMobile ? pageData.images.mobile : pageData.images.title)} />
                </section>
                <section className="index">
                    {!isMobile && <div className="bn-money" data-device="web">
                        <img src={HOST_URL + pageData.images.money} />
                    </div>}
                    <DateHeading dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }} />
                    <EventGroup eventList={mergedArray(pageData.eventList)} />
                    <div className="container">
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                        <PointTable htmlString={sec[1]} columeType />
                        {(sec[2] && sec[2].match(/img/g) !== null) &&
                            <div className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[2]) }}></div>}
                        <CurrTable htmlString={sec[sec.length - 1]} />
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
            </main>
        </>
    );
};

export default TemplateComponent;