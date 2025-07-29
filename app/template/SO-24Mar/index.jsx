import './assets/scss/app.scss';
import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/aBlackLives/style.css";
import api from "@/service/api";
import bg from './assets/images/bg.webp';
import coin_L from './assets/images/img_coin_L.webp';
import coin_R from './assets/images/img_coin_R.webp';
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import Table from './Table'
import DateHeading from './DateHeading';
import TermsConditions from '@/component/Promo/TermsConditions';
import PointTable from '@/component/Promo/PointTable';
import { useSelector } from 'react-redux';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading =useSelector((state) => state.loading.value)

    useEffect(() => {
        parseContent();
    }, [pageData])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <main className={`type-${pageData.theme_type}`}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                        <img className='logo' src={HOST_URL + pageData.images.logo} alt="" />
                    </>
                ) : <>
                    <img className="bn-bg" src={bg} />
                    <img className='logo' src={HOST_URL + pageData.images.logo} alt="" />
                    <img className='bn-title' src={HOST_URL + pageData.images.title} alt="" />
                    <img className='bn-deco-1' src={coin_L} alt="" />
                    <img className='bn-deco-2' src={coin_R} alt="" />
                    <span className='light-blue-1'></span>
                    <span className='light-blue-2'></span>
                    <span className='light-blue-3'></span>
                    <span className='light-purple-1'></span>
                    <span className='light-purple-2'></span>
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <EventGroup eventList={pageData.eventList} />
                    { sec.map((item, i) => {
                        if (item.includes('table')) {
                            return <Table key={i} htmlString={item}/>;
                        } else {
                            return <PointTable key={i} htmlString={item} />;
                        }
                    })}
                    <TermsConditions htmlString={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;