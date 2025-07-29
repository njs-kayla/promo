import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/KohinoorBangla/style.css";
import "../../assets/fonts/BebasNeue/style.css"
import api from "@/service/api";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import Coins from './Coins';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const typeA_role = getPublicImage(import.meta.url, 'deco/typeA_role.webp');
const role = getPublicImage(import.meta.url, 'deco/role.webp');
const coin = getPublicImage(import.meta.url, 'deco/coin.webp');
const coinA = getPublicImage(import.meta.url, 'deco/typeA_deco.webp');


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);


    useEffect(() => {
        parseContent();
        AOS.init({ duration: 1000, once: false });

    }, [pageData, loading]);

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)


        setSec(newSec)
    }


    return (
        <main className={`type${pageData.theme_type}`}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="logo">
                            <img src={HOST_URL + pageData.images.logo} alt="" />
                        </div>
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} alt="" />
                        </div>
                        <div className="role">
                            <img src={ pageData.theme_type === "A" ? typeA_role : role} alt="" />
                        </div>
                        <div className="coin">
                            <img src={pageData.theme_type === "A" ? coinA : coin} />
                        </div>
                        <Coins />
                    </>
                )}
                <DateHeading
                    dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }}
                    GMT={pageData.GMT}
                />
            </section>
            <section className="index">
                <div className="container">
                    {sec.map((item, index) => {
                        if (index !== 0) return <div className='content-block' key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
                    }
                    )}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;