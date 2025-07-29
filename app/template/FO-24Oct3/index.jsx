import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Sekate/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import front from './assets/images/deco/banner_front.webp';
import center from './assets/images/deco/banner_center.webp';
import mouse from './assets/images/deco/mouse.webp';
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
    const [scrollStatus, setScrollStatus] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({});
    const [cursorSize, setCursorSize] = useState("1")
    const loading = useSelector((state) => state.loading.value);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec);
    }

    const changeCursor = () => {
        window.addEventListener('mousemove', (e) => {
            if (e.target.closest('header') || e.target.closest('footer')) {
                setCursorSize('0')
            } else {
                setCursorSize('1')
            }
            setCursorPosition({ x: e.pageX, y: e.pageY })
        })

        return () => {
            window.removeEventListener('mousemove', (e) => {
                setCursorPosition({ x: e.pageX, y: e.pageY })
            })
        }
    }

    useEffect(() => {
        if (loading || isMobile) return;

        const handleScroll = () => {
            if (scrollY > 10) {
                setScrollStatus('active')
            } else {
                setScrollStatus(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        changeCursor()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [loading, isMobile])



    return (
        <main className={`${scrollStatus}`}>
            {!isMobile && <img className='cursor'
                style={{
                    top: `${cursorPosition.y}px`,
                    left: `${cursorPosition.x}px`,
                    transform: `scale(${cursorSize}) translate(-50%, -50%)`
                }}
                src={mouse} alt="" />}
            <section className={`banner ${scrollStatus}`}>
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <div className={`bn-bg ${scrollStatus}`}>
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="Money" />
                        </div>
                        <div className={`bn-center ${scrollStatus}`}>
                            <img src={center} alt="" />
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
            <section className={`index ${scrollStatus}`}>
                { !isMobile && <div className={`bn-front ${scrollStatus}`}>
                    <img src={front} alt="" />
                </div>}
                <div className={`container ${scrollStatus}`}>
                    {sec.map((item, index) => {
                        if (index !== 0) return <>
                            <div className='content-block' key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
                        </>
                    })}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;