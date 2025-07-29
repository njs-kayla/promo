import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BerlinSansFBDemi/style.css";
import "../../assets/fonts/Belanosima/style.css";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const yeti = getPublicImage(import.meta.url, 'yeti.webp');
const penguin = getPublicImage(import.meta.url, 'penguin.webp');
const content = getPublicImage(import.meta.url, 'banner_img/content_bg.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value)


    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1200, once: true });
        }
    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;

        let secArr = content.split(pattern);

        let newSec = secArr.map((str, i) => {
            if (i === 0) return str;
            return `${pattern}${str}`;
        });

        setSec(newSec);
    }


    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="content-bg">
                            <img src={content} alt="" />
                        </div>
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <div data-aos="show" className="role penguin">
                            <img src={penguin} alt="" />
                        </div>
                        <div data-aos="show" className="role yeti">
                            <img src={yeti} alt="" />
                        </div>
                        {pageData.images.money && (
                            <div className="bn-money">
                                <img src={HOST_URL + pageData.images.money} alt="" />
                                <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                            </div>
                        )}
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
                        if (index !== 0) return <>
                            <div className='content-block' key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
                        </>
                    })}
                </div>
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;