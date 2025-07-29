import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/FugazOne/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import coin from './assets/images/deco/coin.webp'
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn'

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    const parseContent = () => {
        const pattern = "<h2";
        const { content } = pageData;

        let secArr = content.split(pattern);

        let newSec = secArr.map((str, i) => {
            if (i === 0) return str;

            const updatedStr = str.replace(/<strong>(.*?)<\/strong>/g, (match, p1) => {
                return `<span class='title-bg'><strong data-text="${p1}">${p1}</strong></span>`;
            });

            return `${pattern}${updatedStr}`;
        });

        setSec(newSec);
    }


    return (
        <main>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        {pageData.images.other.length > 0 ?
                            <img className="bn-bg" src={HOST_URL + pageData.images.other[0]} /> :
                            <img className="bn-bg" src={bg} />
                        }
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        {pageData.images.money && (
                            <div className="bn-money">
                                <img src={HOST_URL + pageData.images.money} alt="Money" />
                            </div>
                        )}
                        <div className="coin">
                            <img src={coin} alt="" />
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
                    {sec.map((item, index) => {
                        if (index !== 0) return <>
                            <div className='content-block' key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
                        </>
                    })}
                </div>
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;