import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BMHANNA/style.css";
import "../../assets/fonts/RodfatTwoDemo/style.css"
import banner from "./assets/images/web_bg.webp";
import cat from "./assets/images/deco/cat.webp";
import cowboy_L from "./assets/images/deco/cowboy_L.webp";
import cowboy_R from "./assets/images/deco/cowboy_R.webp";
import sparkles from "./assets/images/deco/sparkles.webp"

import api from "@/service/api";
import { useEffect, useState, Fragment } from 'react';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import { t } from "i18next"
import ReactWOW from 'react-wow';
import '../../../node_modules/animate.css'


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [ playTitleAnimation, setPlayTitleAnimation ] = useState(false);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    useEffect(() => {
        if (isMobile) {
            setPlayTitleAnimation(true);
        }
    }, [isMobile])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
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
    
    const TitleComponent = ({ htmlContent, tag, className = null }) => {
        return playTitleAnimation && (
            !isMobile ? (
                <ReactWOW duration='0.4s' delay='0.3s' animation='rotateInUpLeft'>
                    {tag === "h3" ? <h3 className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : <h4 className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} />}
                </ReactWOW>
            ) : (
                tag === "h3" ? <h3 className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : <h4 className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            )
        );
    };
    const ContentComponent = ({ htmlContent, className = null }) => {
        return playTitleAnimation && (
            !isMobile ? (
                <ReactWOW duration='1s' delay='0.3s' animation='slideInUp' >
                    <div className={className} dangerouslySetInnerHTML={{__html: htmlContent}}></div>
                </ReactWOW>
            ) : (
                <div className={className} dangerouslySetInnerHTML={{__html: htmlContent}}></div>
            )
        ) 
    }
    

    const handleAnimation = () => {
        setPlayTitleAnimation(true)
    }

    
    return sec.length !== 0 && (
        <main className="">
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <div className="logo-area">
                            <ReactWOW duration='0.5s' delay='0.2s' animation='rotateInUpLeft'>
                                <img className='logo' src={HOST_URL + pageData.images.logo} />
                            </ReactWOW>
                        </div>
                        <div className="title-area">
                            <div className="role-group">
                                <ReactWOW duration='0.5s' delay='0.6s' animation='rotateInUpLeft'><img className='cowboy_L' src={cowboy_L}/></ReactWOW>
                                <ReactWOW duration='0.5s' delay='0.9s' animation='rotateInUpLeft'><img className='cat' src={cat}/></ReactWOW>
                                <ReactWOW callback={handleAnimation} duration='0.5s' delay='1.2s' animation='rotateInUpLeft'><img className='cowboy_R' src={cowboy_R}/></ReactWOW>
                            </div>
                            <ReactWOW duration='0.5s' delay='0.5s' animation='slideInUp'><img className='bn-title' src={HOST_URL + pageData.images.title}/></ReactWOW>
                        </div>
                        <img className='sparkles' src={sparkles} />
                        <img className="bn-bg" src={banner} />
                    </>
                )}
            </section>
            <section className="index">
                <div className="container">
                        <DateHeading
                            isMobile={isMobile}
                            dateData={{
                                startGroup: pageData.eventList[0],
                                endGroup: pageData.eventList[pageData.eventList.length - 1]
                            }}
                        />
                         <div className='points-block'>
                            <TitleComponent htmlContent={sec[1].title} tag="h3" />
                            <ContentComponent htmlContent={sec[1].content} />
                         </div>
                        <div className='points-block'>
                            <TitleComponent htmlContent={sec[2].title} tag="h4" />
                            <ContentComponent htmlContent={sec[2].content} />
                        </div>
                        <div className='points-block'>
                            <TitleComponent htmlContent={sec[3].title} tag="h3" />
                            <ContentComponent htmlContent={sec[3].content} />
                        </div>
                        <TitleComponent className="title" htmlContent={t('TermsConditions')} tag="h3" />
                        <ContentComponent htmlContent={pageData.terms_and_conditions } className="content" />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;