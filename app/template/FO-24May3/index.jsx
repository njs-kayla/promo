import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BangoPro/style.css";
import "../../assets/fonts/BoonTook-Regular/style.css"
import bg from "./assets/images/banner_img/bg.webp";
import fox from "./assets/images/deco/fox.webp";
import chick from "./assets/images/deco/chick.webp";
import frog from "./assets/images/deco/frog.webp";
import rabbit from "./assets/images/deco/rabbit.webp";
import role1 from "./assets/images/deco/role_1.webp";
import role2 from "./assets/images/deco/role_2.webp";
import role3 from "./assets/images/deco/role_3.webp";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn'

const RolesComponent = ({ animationPlay }) => {
    return (
        <div className="roles-container">
            <img 
                style={{ '--top': '34%', '--left': '15%', '--w': "10%" }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={chick} 
                alt="Chick" />
            <img 
                style={{ '--top': '66%', '--left': '81%', '--w': '6%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={frog} 
                alt="Frog" />
            <img 
                style={{ '--top': '49%', '--left': '11.5%', '--w': "21%" }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={rabbit} 
                alt="Rabbit" />
            <img 
                style={{ '--top': '41%', '--left': '71%', '--w': '17%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={fox} 
                alt="Fox" />
            <img 
                style={{ '--top': '14%', '--left': '21%', '--w': '13%', zIndex: -1 }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={role1} 
                alt="Role1" />
            <img 
                style={{ '--top': '13%', '--left': '64%', '--w': '15%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={role2} 
                alt="Role2" />
            <img 
                style={{ '--top': '5%', '--left': '53%', '--w': '11%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={role3} 
                alt="Role3" />
        </div>
    )
}

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec ] = useState([]);
    const [ animationPlay, setAnimationPlay ] = useState(false);

    useEffect(() => {
        setAnimationPlay(false)
        parseContent();
        setTimeout(() => {
            setAnimationPlay(true)
        }, 800)
    }, [pageData]);

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return  (
        <main >
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <img className='bn-title' src={HOST_URL + pageData.images.title}/>
                        <img className='bn-money' src={HOST_URL + pageData.images.money}/>
                        <img className='excl' src={HOST_URL + pageData.images.other[0]}/>
                        <RolesComponent animationPlay={animationPlay} />
                    </>
                )}
                <DateHeading
                    dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }}
                />
            </section>
            <section className="index">
                <div className="container">
                    { sec.map((item, index) => {
                            if (index !== 0) return <div className='content-block' key={index} dangerouslySetInnerHTML={{__html: item}}></div> 
                        } 
                    ) }
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;