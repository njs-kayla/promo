import './assets/scss/app.scss';
import "../../assets/fonts/Helvetica/style.css";
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/agencyfb/style.css";
import "../../assets/fonts/roboto/style.css";
import { useEffect, useState, useRef } from 'react';
import api from '@/service/api';
import RWD from '@/service/RWD';
import CurrTable from './CurrTable';
import { htmlImg, mergedArray } from '@/service/util';
import MoreBtn from '@/component/Promo/MoreBtn';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bn_bg.webp');
const cursor = getPublicImage(import.meta.url, 'deco/mark.webp');


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [cursorPosition, setCursorPosition] = useState({});
    const [cursorSize, setCursorSize] = useState('1')
    const loading = useSelector((state) => state.loading.value);
    const tableContent = useRef(null)


    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
        changeCursor()

    }, [pageData, loading]);

    const changeCursor = () => {
        window.addEventListener('mousemove', (e) => {
            setCursorPosition({ x: e.pageX, y: e.pageY })
        })

        return () => {
            window.removeEventListener('mousemove', (e) => {
                setCursorPosition({ x: e.pageX, y: e.pageY })
            })
        }
    }

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            if (e.target.closest('header') || e.target.closest('footer')) {
                setCursorSize('0')
            } else if (tableContent.current && (tableContent.current.contains(e.target) || e.target.closest('.btn-more'))) {
                setCursorSize('1')
            } else {
                setCursorSize('3')
            }
        };

        const handleMouseDown = (e) => {
            if (tableContent.current && (tableContent.current.contains(e.target) || e.target.closest('.btn-more'))) return;
            setCursorSize('2');
        };

        const handleMouseUp = (e) => {
            if (tableContent.current && (tableContent.current.contains(e.target) || e.target.closest('.btn-more'))) return;
            setCursorSize('3');
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [tableContent]);

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
                {!isMobile && <img className='cursor'
                    style={{
                        top: `${cursorPosition.y}px`,
                        left: `${cursorPosition.x}px`,
                        transform: `scale(${cursorSize})`
                    }}
                    src={cursor} alt="" />}
                <section className="banner">
                    {!isMobile ? <>
                        <div className="bn-bg">
                            <img src={bg} alt="" />
                        </div>
                        <div className="bn-title" data-aos="fade-up">
                            <img src={HOST_URL + pageData.images.title} alt="" />
                        </div>
                        <div className="bn-money" data-aos='fade-up' data-aos-delay='300'>
                            <img src={HOST_URL + pageData.images.money} />
                        </div>
                        <div className="bn-tag">
                            <img src={HOST_URL + pageData.images.other[0]} />
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
                    }} GMT={pageData.GMT} />
                </section>
                <section className="index">
                    <div className="container">
                        <EventGroup eventList={pageData.eventList} info={sec[0]} GMT={pageData.GMT} />
                        {(sec[1] && sec[1].match(/img/g) !== null) &&
                            <div className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[1]) }}></div>}
                        <PointTable htmlString={sec[2]} columeType />
                        <CurrTable ref={tableContent} htmlString={sec[sec.length - 1]} />
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
            </main>
        </>
    );
};

export default TemplateComponent;