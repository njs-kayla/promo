import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import api from "@/service/api";
import coin_l from './assets/images/deco/coin_l.webp';
import coin_r from './assets/images/deco/coin_r.webp';
import coin_d from './assets/images/deco/coin_d.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const loading = useSelector((state) => state.loading.value);

    return (
        <main className={loading ? `main-load type-${pageData.theme_type}` : `type-${pageData.theme_type}`}>
            {!isMobile && <>
                <img className="deco-img-1" src={coin_l} alt="" />
                <img className="deco-img-2" src={coin_r} alt="" />
                <img className="deco-img-3" src={coin_d} alt="" />
            </>}
            <section className="banner">
                <img className="bn-bg" src={HOST_URL + (isMobile ? pageData.images.mobile : pageData.images.title)} alt="" />
                <div className="bn-money">
                    <img src={HOST_URL + pageData.images.money} />
                </div>
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
            </section>
            <section className="index">
                <EventGroup eventList={mergedArray(pageData.eventList)} />
                <div className="info-block">
                    {!isMobile && <>
                        <i className="rell top" ></i>
                        <i className="rell bottom" ></i>
                    </>}
                    <div id="pageContent" dangerouslySetInnerHTML={{ __html: pageData.content }}></div>
                    <h2 >{t('TermsConditions')}</h2>
                    <div className="info-content"
                        dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                    <template id="currency-select">
                        <div className="currency-select dropdown">
                            <div className="default dropdown-btn"></div>
                            <ul className="list dropdown-list"></ul>
                        </div>
                    </template>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;