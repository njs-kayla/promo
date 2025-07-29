import './assets/scss/app.scss';
import '../../assets/fonts/roboto/style.css';
import '../../assets/fonts/Barlow/style.css';
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import bg_2 from './assets/images/bg/pc_bg.webp';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import BlossomEffect from './BlossomEffect';
import EventGroup from './EventGroup';
import PointTable from '@/component/Promo/PointTable'
import { useSelector } from 'react-redux';
import i18n from '@/service/i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const slug = pageData.customizeData?.slug || null;

    useEffect(() => {
        parseContent();
    }, [pageData]);

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => (i > 0 ? pattern : '') + str);
        setSec(newSec);
    };

    return (
        <main className={`type-${pageData.theme_type} ${Object.keys(pageData.customizeData).length > 0 && pageData.customizeData.slug}`}>
            {!isMobile && <BlossomEffect />}
            <section className="banner">
                {!isMobile ?
                    <>
                        <div className="bn-bg">
                            <img src={slug === 'KDTOP' ? bg_2 : bg} alt="" />
                        </div>
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} alt="" />
                        </div>
                        <div className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="" />
                            <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                        </div>
                    </> :
                    <>
                        <div className="bn-bg">
                            <img src={HOST_URL + pageData.images.mobile} alt="" />
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
            </section>
            <section className="index">
                {pageData.eventList[0].length > 1 && <EventGroup eventList={pageData.eventList[0]} GMT={pageData.GMT} titleData={pageData.customizeData} />}
                {
                    sec.map((secItem, i) => {
                        if (i !== 0) return <PointTable htmlString={secItem}></PointTable>
                    }
                    )
                }
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;