import './assets/scss/app.scss';
import "../../assets/fonts/bigjohn/style.css";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import { mergedArray, htmlImg } from '@/service/util';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);


    useEffect(() => {
        parseContent()
    }, [pageData])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec);
    }

    return (
        <main className={`type${pageData.theme_type}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className='bn-title'>
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} GMT={pageData.GMT} />
                    </>
                }
            </section>
            <section className="index">
                <div className="container">
                    {pageData.eventList.length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                    {sec.map((content, i) => (
                        <div key={i} className="info-block" dangerouslySetInnerHTML={{ __html: htmlImg(content) }}></div>
                    ))}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;