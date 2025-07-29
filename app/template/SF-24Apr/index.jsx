import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/agencyfb/style.css";
import "../../assets/fonts/poppins/style.css";
import bubbles from './assets/js/bubbles'
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import bg from './assets/images/bg/img_webBG.webp';
import dragon from './assets/images/deco/img_DrgonKing.webp'
import EventGroup from './EventGroup';
import CurrTable from '@/component/Promo/CurrTable';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import { htmlImg } from '@/service/util';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value)
    const [newHtmlString, setNewHtmlString] = useState(null);


    useEffect(() => {
        parseContent();
        if (loading) {
            AOS.init({ duration: 1000, once: true });
        }
    }, [pageData])

    useEffect(() => {
        bubbles()
    }, [])
    
    useEffect(() => {
        if (sec.length > 0) {
            tdAddSpan(sec[3]);
        }
    }, [sec, loading])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    const tdAddSpan = (htmlString) => {
        var modifiedHtmlString = htmlString.replace(/<td(?:\s+colspan="(\d+)")?[^>]*>([^<]*)<\/td>/g, function(match, colspan, content) {
            if (colspan !== undefined) {
                return '<td colspan="' + colspan + '"><span>' + content + '</span></td>';
            } else {
                return '<td><span>' + content + '</span></td>';
            }
        });
        setNewHtmlString(modifiedHtmlString)
    }

    return (
        <main>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? (HOST_URL + pageData.images.mobile) : bg} />
                {!isMobile && <>
                    <div className='bn-main up'>
                        <img data-aos='zoom-in-up' data-aos-duration="800" data-aos-delay="50" className='bn-title' src={HOST_URL + pageData.images.title} />
                        <div data-aos='zoom-in-up' data-aos-duration="800" data-aos-delay="500" className="bn-money">
                            <img src={HOST_URL + pageData.images.money} />
                        </div>
                    </div>
                    <img data-aos='zoom-in-up' data-aos-duration="800" data-aos-delay="900" src={dragon} className='dragon' />
                    <img data-aos='zoom-in-up' data-aos-duration="800" data-aos-delay="1300" src={HOST_URL + pageData.images.other[0]} className='bn-tag' alt="" />
                </>}
                <canvas></canvas>
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <div className="event-block" data-aos="fade-up">
                        <EventGroup eventList={pageData.eventList} />
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                    </div>
                    <div>
                        {(sec[1] && sec[1].match(/img/g) !== null) &&
                            <div className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[1]) }}></div>}
                    </div>
                    <div className='points-block' dangerouslySetInnerHTML={{__html: sec[2]}}></div>
                    {(newHtmlString && !isMobile) ? <div>
                        <CurrTable htmlString={newHtmlString} />
                    </div> : <CurrTable htmlString={sec[3]} />}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;