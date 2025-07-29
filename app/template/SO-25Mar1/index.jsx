import './assets/scss/app.scss';
import '../../assets/fonts/Kanit/style.css';
import '../../assets/fonts/poppins/style.css';
import '../../assets/fonts/ArchivoNarrow/style.css';
import '../../assets/fonts/BebasNeue/style.css';
import '../../assets/fonts/PubgSans/style.css';
import '../../assets/fonts/DoHyeon/style.css';
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import MbEventGroup from './MbEventGroup';
import MoreBtn from '@/component/Promo/MoreBtn';
import MoreInfo from '@/component/Promo/MoreInfo'
import { mergedArray } from '@/service/util';
import fox from './assets/images/deco/peo_r.webp';
import cat from './assets/images/deco/peo_l.webp';
import tag from './assets/images/deco/tag.webp'
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CoinEffect from './CoinEffect';
import { t } from 'i18next';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);


    useEffect(() => {
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
        parseContent()

    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)


        setSec(newSec);
    }

    return (
        <main className={loading ? `main-load type${pageData.theme_type}` : `type${pageData.theme_type}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img data-aos="fade-right" data-aos-delay="500" src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bonus">
                            <img data-aos="fade-right" data-aos-delay="500" src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                        <div className="tag">
                            <img data-aos="fade-right" data-aos-delay="500" src={tag} alt="" />
                        </div>
                        <div className="char-wrap">
                            <div className="fox" data-aos="fade-right" data-aos-delay="1000">
                                <img src={fox} alt="fox" />
                            </div>
                            <div className="cat" data-aos="fade-left" data-aos-delay="1000">
                                <img src={cat} alt="cat" />
                            </div>
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
                <CoinEffect />
            </section>
            {(mergedArray(pageData.eventList).length > 1 && isMobile) && <MbEventGroup eventList={mergedArray(pageData.eventList)} />}
            <section className="index">
                <div className="container">
                    {(mergedArray(pageData.eventList).length > 1 && !isMobile) && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                    {sec.map((item, i) => (
                        <div className='points-block' key={i} dangerouslySetInnerHTML={{ __html: item }}></div>
                    ))}
                    {isMobile ?
                        <MoreInfo html={pageData.terms_and_conditions} /> :
                        <div className='TC'>
                            <strong className='title'>{t('TermsConditions')}</strong>
                            <div className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;