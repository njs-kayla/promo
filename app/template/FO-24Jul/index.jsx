import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BangoPro/style.css";
import "../../assets/fonts/Mada/style.css"
import bg from "./assets/images/banner_img/bg.webp";
import role1 from "./assets/images/deco/role_1.webp";
import role2 from "./assets/images/deco/role_2.webp";
import sparkle from './assets/images/deco/sparkle.webp';
import api from "@/service/api";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);

    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
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
                        { pageData.images.logo && <div  data-aos="fade-up" className="bn-logo">
                            <img src={HOST_URL + pageData.images.logo} />
                        </div>}
                        <div  data-aos="fade-up" className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                            <img className='sparkle' src={sparkle} alt="sparkle" />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="1200" className="bn-money">
                            <img src={HOST_URL + pageData.images.money} />
                            <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="400" className="role1">
                            <img src={role1} alt="role1" />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="800" className="role2">
                            <img src={role2} alt="role2" />
                        </div>
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