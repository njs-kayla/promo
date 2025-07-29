import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/CarterOne/style.css";
import "../../assets/fonts/Mukta-Extra/style.css";
import "../../assets/fonts/BoonTook-Regular/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import monkey from './assets/images/deco/monkey.webp';
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import TermsConditions from '@/component/Promo/TermsConditions';
import { t } from "i18next"
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactWOW from 'react-wow';
import MoreBtn from '@/component/Promo/MoreBtn'

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [ playTitleAnimation, setPlayTitleAnimation ] = useState(false);
    const [ headerShadow, setHeaderShadow ] = useState(false)

    useEffect(() => {
        parseContent();
    }, [pageData]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                AOS.init({ 
                    duration: 1000, 
                    once: true,
                });
                setHeaderShadow(true)
            } else {
                setHeaderShadow(false)
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sec]);
    

    const parseContent = () => {
        const { content } = pageData;
        const pattern = "<h";
        const secArr = content.split(pattern);
        const newSec = secArr.map((str, i) => {
            if (i > 0) {
                const titleRegex = /[3|4][^>]*>(.+?)<\/h[3|4]>/;
                const titleMatch = str.match(titleRegex);
                const title = titleMatch ? titleMatch[1] : '';

                const contentRegex = /<\/h[3|4]>(.*)/;
                const contentMatch = str.match(contentRegex);
                const content = contentMatch ? contentMatch[1] : '';
    
                return { title, content };
            } else {
                return { original: str };
            }
        });
        setSec(newSec);
    };
    
    const handleAnimation = () => {
        setPlayTitleAnimation('rubberBand')
    }

    return  (
        <main className={`${headerShadow ? "headerShadow" : ""}`}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-main">
                            <ReactWOW callback={handleAnimation} duration='1s' delay='0.5s' animation='backInLeft'>
                                <div className="bn-title-bg">
                                    <img src={HOST_URL + pageData.images.other[0]} />
                                </div>
                            </ReactWOW>
                            <ReactWOW duration='3s' iteration='infinite' animation={playTitleAnimation}>
                                <div className={`bn-title ${playTitleAnimation}`}>
                                    <img src={HOST_URL + pageData.images.title} />
                                </div>
                            </ReactWOW>
                            <ReactWOW duration='1s' animation={playTitleAnimation ? "backInLeft" : null}>
                                <div className={`bn-monkey ${playTitleAnimation}`}>
                                    <img src={monkey} />
                                </div>
                            </ReactWOW>
                        </div>
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
                    { sec.map((item, i) => {
                        return i > 0 && (
                            <div key={i} className='points-block'>
                                <div data-aos="fade-up" className="box">
                                    { i !== 2 ? <>
                                        <h3 className='heading'>{ item.title }</h3>
                                        <h3 className='title-stroke'>{ item.title }</h3>
                                    </> : <>
                                        <h4 className='table-heading' data-storke={item.title} dangerouslySetInnerHTML={{ __html: item.title }}></h4>
                                    </> }
                                </div>
                                <div data-aos="fade-up" dangerouslySetInnerHTML={{ __html: item.content}} ></div>
                            </div>
                        )
                    })}
                    { sec && <div data-aos="fade-up">
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>}
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;