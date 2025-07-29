import './assets/scss/app.scss';
import "../../assets/fonts/Helvetica/style.css";
import "../../assets/fonts/agencyfb/style.css";
import "../../assets/fonts/roboto/style.css";
import bg from './assets/images/banner_img/bn_bg.webp';
import dragon from './assets/images/deco/dragon.webp';
import { useEffect, useState, useRef } from 'react';
import api from '@/service/api';
import RWD from '@/service/RWD';
import CurrTable from './CurrTable';
import { htmlImg, mergedArray } from '@/service/util';
import MoreBtn from '@/component/Promo/MoreBtn';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import Water from './Water';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const indexRef = useRef(null);
    const [ waterDisplay, setWaterDisplay ] = useState(false)


    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 700, once: true });
        }
    }, [pageData, loading])

    useEffect(() => {
        const handleDisplay = () => {
            let top = indexRef.current.getBoundingClientRect().top
            if (top <= 120) {
                setWaterDisplay(true)
            } else {
                setWaterDisplay(false)
            }
        }
        window.addEventListener('scroll', handleDisplay)
        return () => window.removeEventListener('scroll', handleDisplay);
        
    }, [])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <>
            <main>
                <section className="banner">
                    {!isMobile ? <>
                        <div className="bn-bg">
                            <img src={bg} alt="" />
                        </div>
                        <div className="bn-title" data-aos="rubberband">
                            <img src={HOST_URL + pageData.images.title} alt="" />
                        </div>
                        <div className="bn-money" data-aos='zoom-in-up' data-aos-delay='400'>
                            <img src={HOST_URL + pageData.images.money} />
                        </div>
                        <div className="bn-tag" data-aos='zoom-in-up' data-aos-delay='1400'>
                            <img src={HOST_URL + pageData.images.other[0]} />
                        </div>
                        <div className="dragon" data-aos='zoom-in-up' data-aos-delay='1000'>
                            <img src={dragon} alt="" />
                        </div>
                    </> : <>
                        <div className="bn-bg">
                            <img src={HOST_URL + pageData.images.mobile} alt="" />
                        </div>
                    </>
                    }
                    <DateHeading dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }} />
                </section>
                <section ref={indexRef} className="index">
                    <div className="container">
                        <EventGroup eventList={pageData.eventList} info={sec[0]} />
                        {(sec[1] && sec[1].match(/img/g) !== null) &&
                            <div className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[1]) }}></div>}
                        <PointTable htmlString={sec[2]} columeType />
                        <CurrTable htmlString={sec[sec.length - 1]} />
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
                {!isMobile && waterDisplay && <Water />}
            </main>
        </>
    );
};

export default TemplateComponent;