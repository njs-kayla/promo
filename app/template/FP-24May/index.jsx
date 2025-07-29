import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/BangoPro/style.css";
import "../../assets/fonts/Anton/style.css";
import "../../assets/fonts/GemunuLibre-ExtraBold/style.css";
import "../../assets/fonts/BoonTook-Regular/style.css";
import { useEffect, useState } from 'react';
import api from '@/service/api';
import RWD from '@/service/RWD';
import Table from './Table'
import { mergedArray } from '@/service/util';
import MoreBtn from '@/component/Promo/MoreBtn';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg.webp');
const rabbit = getPublicImage(import.meta.url, 'deco/rabbit.webp');
const chick = getPublicImage(import.meta.url, 'deco/chick.webp');
const frog = getPublicImage(import.meta.url, 'deco/frog.webp');
const fox = getPublicImage(import.meta.url, 'deco/fox.webp');
const heart = getPublicImage(import.meta.url, 'deco/heart.webp');
const bomb = getPublicImage(import.meta.url, 'deco/bomb.webp');
const plum = getPublicImage(import.meta.url, 'deco/plum.webp');


const RolesComponent = ({ animationPlay }) => {
    return (
        <div className="roles-container">
            <img 
                style={{ '--top': '19%', '--left': '10%', '--w': "22%" }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={rabbit} 
                alt="rabbit" />
            <img 
                style={{ '--top': '59%', '--left': '69%', '--w': '17%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={frog} 
                alt="Frog" />
            <img 
                style={{ '--top': '12%', '--left': '23%', '--w': "13%"}} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={heart} 
                alt="heart" />
            <img 
                style={{ '--top': '45%', '--left': '74%', '--w': '21%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={fox} 
                alt="Fox" />
            <img 
                style={{ '--top': '42%', '--left': '8%', '--w': '25%'}} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={bomb} 
                alt="bomb" />
            <img 
                style={{ '--top': '14%', '--left': '70%', '--w': '13%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={chick} 
                alt="chick" />
            <img 
                style={{ '--top': '29%', '--left': '75%', '--w': '9%' }} 
                className={`role ${animationPlay ? 'active' : ''}`} 
                src={plum} 
                alt="plum" />
        </div>
    )
}

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [ animationPlay, setAnimationPlay ] = useState(false);

    useEffect(() => {
        setAnimationPlay(false)
        parseContent();
        setTimeout(() => {
            setAnimationPlay(true)
        }, 800)
    }, [pageData])

    const parseContent = () => {
        const pattern = '<h';
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        for (var i = 0; i < newSec.length; i++) {
            newSec[i] = newSec[i].replace(/<h3>(.*?)<\/h3>/g, function(match, p1) {
                return match + '<h3 class="title-stroke">' + p1 + '</h3>';
            });
        }
        console.log(newSec);
        setSec(newSec);
    };
    
    return (
        <>
            <main>
                <section className="banner">
                    {
                        isMobile ? <>
                            <img className='bn-bg' src={HOST_URL + pageData.images.mobile} />
                        </> : <>
                            <img className="bn-bg" src={bg} />
                            <img className='bn-title' src={HOST_URL + pageData.images.title}/>
                            <img className='bn-money' src={HOST_URL + pageData.images.money}/>
                            <RolesComponent animationPlay={animationPlay} />
                            <DateHeading dateData={mergedArray(pageData.eventList)} />
                        </>
                    }
                </section>
                <section className="index">
                    <div className="container">
                        { isMobile && <DateHeading dateData={mergedArray(pageData.eventList)} /> }
                        <EventGroup eventList={mergedArray(pageData.eventList)} />
                        <PointTable htmlString={sec[1]} />
                        <PointTable htmlString={sec[2]} />
                        <Table htmlString={sec[3]}/>
                        <PointTable htmlString={sec[4]} type='column' stroke/>
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
            </main>
        </>
    );
};

export default TemplateComponent;