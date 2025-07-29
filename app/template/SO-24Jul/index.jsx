import './assets/scss/app.scss';
import "../../assets/fonts/Rift/style.css";
import "../../assets/fonts/Akshar/style.css";
import "../../assets/fonts/AlumniSans/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import { mergedArray } from '@/service/util';
import { useSelector } from 'react-redux';
import i18n from '@/service/i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');
const helloween_bg = getPublicImage(import.meta.url, 'bg/helloween_bg.webp');
const excu = getPublicImage(import.meta.url, 'deco/excu.webp');
const excu_th = getPublicImage(import.meta.url, 'deco/excu_thi.webp');
const hw_excu = getPublicImage(import.meta.url, 'deco/img_tag.webp');
const peo = getPublicImage(import.meta.url, 'deco/peo.webp');
const hw_peo = getPublicImage(import.meta.url, 'deco/img_cha.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const loading = useSelector((state) => state.loading.value);


    useEffect(() => {
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
    }, [pageData, loading])

    return (
        <main className={loading ? `main-load type${pageData.theme_type}` : `type${pageData.theme_type}`}>
            <section className="banner">
                <img
                    className="bn-bg"
                    src={
                        isMobile
                            ? HOST_URL + pageData.images.mobile
                            : (pageData.theme_type === 'C' ? helloween_bg : bg)
                    }
                    alt=""
                />
                {!isMobile &&
                    <>
                        <div data-aos="fade-right" data-aos-delay="1200" className='peo-area'>
                            <img className='peo' src={pageData.theme_type === 'C' ? hw_peo : peo} />
                        </div>
                        <div className='title-area'>
                            <img data-aos="zoom-in" className='bn-title' src={HOST_URL + pageData.images.title} />
                            <img data-aos="zoom-out" data-aos-delay="500" className='bonus' src={HOST_URL + pageData.images.money} alt="" />
                            <img data-aos="fade-up" 
                            data-aos-delay="800" 
                            className="excu" 
                            src={
                                pageData.theme_type === 'C' ?
                                hw_excu : (i18n.language === 'th-TH' 
                                ? excu_th : excu)
                            } />
                            <div className="won">
                                <img data-aos="fade-up" data-aos-delay="800" src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                            </div>
                        </div>
                        <div className="logo">
                            <img data-aos="zoom-in" className='bn-title' src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
            </section>
            <section className="index">
                <EventGroup eventList={mergedArray(pageData.eventList)} />
                <div className="info-block">
                    <div id="pageContent" dangerouslySetInnerHTML={{ __html: pageData.content }}></div>
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;