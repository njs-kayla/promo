import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/roboto/style.css";
import wave from "./assets/images/img_oceanWaves.webp"
import { useEffect, useState } from 'react';
import api from '@/service/api';
import RWD from '@/service/RWD';
import CurrTable from '@/component/Promo/CurrTable';
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
            <section className="banner">
                <img className="bn-bg" src={HOST_URL + (isMobile ? pageData.images.mobile : pageData.images.title)} />
                <div className="bn-money">
                    <img src={HOST_URL + pageData.images.money} alt="" />
                </div>
                {!isMobile && <img className="wave" alt="" src={wave}></img>}
            </section>
            <main>
                <section className="index">
                    <div className="container">
                        <div className='tournament-block'>
                            <DateHeading dateData={{
                                startGroup: pageData.eventList[0],
                                endGroup: pageData.eventList[pageData.eventList.length - 1]
                            }} />
                            <EventGroup eventList={mergedArray(pageData.eventList)} />
                        </div>
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                        <PointTable htmlString={sec[1]} />
                        {(sec[2] && sec[2].match(/img/g) !== null) &&
                            <div className="gameBlock" dangerouslySetInnerHTML={{ __html: htmlImg(sec[2]) }}></div>}
                        <div className="currency-block">
                            <CurrTable htmlString={sec[sec.length - 1]} />
                        </div>
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
            </main >
        </>
    );
};

export default TemplateComponent;