import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/agencyfb/style.css";
import api from "@/service/api";
import coin_l from './assets/images/deco/coin_l.webp';
import coin_r from './assets/images/deco/coin_r.webp';
import kv1_bg from './assets/images/banner_img/kv1_bg.webp';
import { Fragment, useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    AOS.init({ duration: 1000, once: true });

    useEffect(() => {
        AOS.refresh();
    })

    // 文字滾動效果
    const textingEffect = (htmlString) => {
        if (!htmlString) return
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const titles = doc.querySelectorAll('h2,h3,h4,h5,h6');
        const contents = doc.querySelectorAll('p,li,table');
        titles.forEach(title => {
            const letters = title.textContent.split('');
            title.innerHTML = ''
            letters.forEach((letter, i) => {
                const span = document.createElement('span');
                span.innerHTML = letter;
                span.setAttribute('data-aos-delay', 50 * i)
                span.setAttribute('data-aos', 'texting-title')
                title.appendChild(span)
            })
        })
        contents.forEach(content => {
            content.setAttribute('data-aos', 'fade-up')
        })

        return doc.body.innerHTML
    }

    return (
        <main>
            {!isMobile && <>
                <img className="deco-img-1" src={coin_l} alt="" />
                <img className="deco-img-2" src={coin_r} alt="" />
            </>}
            <section className="banner">
                <img className="bn-bg" src={isMobile ? (HOST_URL + pageData.images.mobile) : kv1_bg} />
                {!isMobile && <>
                    <div className="bn-title">
                        <img data-aos="fade-up" src={HOST_URL + pageData.images.title} />
                    </div>
                    <div className="bn-money">
                        <img data-aos="fade-up" data-aos-delay="300" src={HOST_URL + pageData.images.money} />
                    </div>
                    {pageData.images.other && <div className="bn-info">
                        <img data-aos="fade-up" data-aos-delay="600" src={HOST_URL + pageData.images.other[0]} />
                    </div>}
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <h2 data-translate="EventTime"></h2>
                    <EventGroup eventList={mergedArray(pageData.eventList)} />
                    <div dangerouslySetInnerHTML={{ __html: textingEffect(pageData.content) }}></div>
                    <div dangerouslySetInnerHTML={{ __html: textingEffect(`<h2>${t('TermsConditions')}</h2>`) }}></div>
                    <div className="info-content" dangerouslySetInnerHTML={{ __html: textingEffect(pageData.terms_and_conditions) }}></div>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;