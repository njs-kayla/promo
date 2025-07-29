import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Anton/style.css";
import titleImg from './assets/images/deco/title.webp';
import wall from './assets/images/deco/pc_wall.webp';
import light_L from './assets/images/deco/light_L.webp';
import light_R from './assets/images/deco/light_R.webp';
import api from "@/service/api";
import { Fragment, useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import PointsTable from './PointsTable';
import TermsConditions from '@/component/Promo/TermsConditions';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MoreInfo from '@/component/Promo/MoreInfo';
import { htmlImg } from '@/service/util';


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [open, setOpen] = useState(false);
    const slug = pageData.customizeData?.slug || null;

    useEffect(() => {
        parseContent();
    }, [pageData]);


    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [sec])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => (i > 0 ? pattern : '') + str);
        setSec(newSec);
    };

    useEffect(() => {
        const IPAD_BREAK_POINT = 1024;
        if (window.innerWidth < IPAD_BREAK_POINT) return;

        const handleScroll = () => {
            if (scrollY > 0) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [sec])



    return (
        <main className={slug ? slug : null}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.title} />
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
                    {pageData.eventList[0].length > 1 && <EventGroup dateData={pageData.eventList} />}
                    {sec.slice(1).map((secItem) =>
                        slug === 'OZZO' ? (
                            <PointsTable htmlString={secItem} />
                        ) : (
                            <div className="points-block" dangerouslySetInnerHTML={{ __html: htmlImg(secItem) }} />
                        )
                    )}

                    {isMobile ? <MoreInfo html={pageData.terms_and_conditions} /> : <TermsConditions htmlString={pageData.terms_and_conditions} />}
                </div>
            </section>
            {/* <!-- deco --> */}
            {!isMobile &&
                <Fragment>
                    <div className={open ? "wall-1 open" : "wall-1"}>
                        <img src={wall} alt="" />
                    </div>
                    <div className={open ? "wall-2 open" : "wall-2"}>
                        <img src={wall} alt="" />
                    </div>
                    <div className={open ? "light-L open" : "light-L"}>
                        <img src={light_L} alt="" />
                    </div>
                    <div className={open ? "light-R open" : "light-R"}>
                        <img src={light_R} alt="" />
                    </div>
                </Fragment>
            }
        </main>
    );
};

export default TemplateComponent;