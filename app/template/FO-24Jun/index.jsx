import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Montserrat/style.css";
import "../../assets/fonts/Magra/style.css";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import MoreBtn from '@/component/Promo/MoreBtn';

import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const bg_mob = getPublicImage(import.meta.url, 'banner_img/mobile_bg.webp');
const slot = getPublicImage(import.meta.url, 'deco/slot.png');
const light = getPublicImage(import.meta.url, 'deco/sparkle_light.webp');
const light_mob = getPublicImage(import.meta.url, 'deco/mobile_sparkle_light.webp');
const role1 = getPublicImage(import.meta.url, 'deco/role_Left.webp');
const role2 = getPublicImage(import.meta.url, 'deco/role_Right.webp');


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => (i > 0 ? pattern : '') + str);
        setSec(newSec);
    };

    return (
        <main className="">
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={bg_mob} />
                        <div className="title-area">
                            <img className="bn-title" src={HOST_URL + pageData.images.mobile} />
                            <img className='light' src={light_mob} alt="" />
                        </div>
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="title-area">
                            <img className="bn-title" src={HOST_URL + pageData.images.title} />
                            <img className='light' src={light} alt="" />
                        </div>
                        <img className='slot' src={slot} alt="" />
                        <img className='role1' src={role1} alt="" />
                        <img className='role2' src={role2} alt="" />
                    </>
                )}
                <DateHeading
                    dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }}
                />
            </section>
            <section className="index">
                <div className="container">
                        <PointTable htmlString={sec[1]} />
                        <div className='points-block' dangerouslySetInnerHTML={{__html: sec[2]}}></div>
                        <div className='points-block' dangerouslySetInnerHTML={{__html: sec[3]}}></div>
                        <MoreBtn html={pageData.terms_and_conditions}/>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;