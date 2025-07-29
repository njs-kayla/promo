import './assets/scss/app.scss';
import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/JetBrainsMono/style.css";
import api from "@/service/api";
import bg from './assets/images/bg.webp';
import role1 from './assets/images/p1.webp';
import role2 from './assets/images/p2.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import Table from './Table'
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import PointTable from '@/component/Promo/PointTable';
import { useSelector } from 'react-redux';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

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
        <main className={`type${pageData.theme_type}`}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} />
                    </>
                ) : <>
                    <img className='bn-bg' src={bg}/>
                    <img className='role1' src={role1}/>
                    <img className='role2' src={role2}/>
                </>}
            </section>
            <section className="index">
                <div className="container">
                    { !isMobile && <>
                        <img className='bn-tag' src={pageData.images.other && HOST_URL + pageData.images.other[0]} alt="" />
                        <img className='bn-title' src={HOST_URL + pageData.images.title} alt="" />
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} />
                    </> }
                    <PointTable htmlString={sec[1]} ></PointTable>
                    <EventGroup eventList={pageData.eventList} />
                    <div className="points-block" dangerouslySetInnerHTML={{__html : sec[2]}}></div>
                    { pageData.theme_type === 'A' ? <PointTable htmlString={sec[3]} /> : <Table htmlString={sec[3]}></Table>}
                    <PointTable htmlString={sec[4]} />
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;