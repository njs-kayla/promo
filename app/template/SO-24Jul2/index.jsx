import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Kanit/style.css";
import "../../assets/fonts/DoHyeon/style.css";
import "../../assets/fonts/Dubai/style.css";
import { t } from "i18next";
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import AOS from 'aos';
import ReactWOW from 'react-wow';
import 'aos/dist/aos.css';
import '../../../node_modules/animate.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const role1 = getPublicImage(import.meta.url, 'deco/role_1.webp');
const role2 = getPublicImage(import.meta.url, 'deco/role_2.webp');
const exclusive = getPublicImage(import.meta.url, 'deco/img_exclusive.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const [ animatePlay, setAnimatePlay ] = useState(false);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    useEffect(() => {
        if (!loading && animatePlay || isMobile) {
            AOS.init({
                duration: 1000,
                once: false,
                disable: isMobile
            });
        }
    }, [animatePlay, loading, isMobile]);
    

    const handleAnimation = () => {
        setAnimatePlay(true)
    }

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str);

        newSec = newSec.map(section => section
            .replace(/<h3>/g, '<h3 data-aos="expand">')
            .replace(/<p>/g, '<p data-aos="fade-up">')
            .replace(/<table/g, '<table data-aos="fade-up"')
        );

        setSec(newSec);
    };

    return (
        <main>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <ReactWOW animation='fadeInUp' duration='1s'>
                            <div className="bn-title">
                                <ReactWOW callback={handleAnimation} animation='fadeInUp' delay='1.3s' duration='1s'>
                                    <div className="exclusive">
                                        <img src={exclusive} alt="exclusive" />
                                    </div>
                                </ReactWOW> 
                                <img src={HOST_URL + pageData.images.title} />
                            </div>
                        </ReactWOW>
                        <ReactWOW animation='fadeInUp' delay='0.5s' duration='1s'>
                            <div className="bn-money">
                                <img src={HOST_URL + pageData.images.money} />
                                <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                            </div>
                        </ReactWOW>
                        <ReactWOW animation='fadeInUp' delay='1s' duration='1s'>
                            <div className="role1">
                                <img src={role1} alt="role1" />
                            </div>
                            <div className="role2">
                                <img src={role2} alt="role2" />
                            </div>
                        </ReactWOW>
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
                        if (index !== 0) return <>
                            <div className='content-block' key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
                        </>
                    })}
                    <h3 data-aos="expand" className='title'>{t('TermsConditions')}</h3>
                    <div data-aos="fade-up" className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;