import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Akshar/style.css";
import bg from "./assets/images/web.webp";
import Captain_b from "./assets/images/Captain_b.webp";
import Captain_m from "./assets/images/Captain_m.webp";
import wave from "./assets/images/element.webp";
import api from "@/service/api";
import { useEffect,  useState } from 'react';
import RWD from '@/service/RWD';
import MoreBtn from '@/component/Promo/MoreBtn'
import ReactWOW from 'react-wow';
import '../../../node_modules/animate.css'


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [ rolesFadeIn, setRoleFadeIn ] = useState(null) 

    useEffect(() => {
        parseContent();
    }, [pageData]);

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

    const handleAnimation = () => {
        setRoleFadeIn("rolesfadeIn");
    }

    return sec.length !== 0 && (
        <main className="">
            <section className="index">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className={`roles ${rolesFadeIn}`}>
                            <div className="pic Captain_m">
                                <img src={Captain_m}/>
                            </div>
                            <div className="pic Captain_b">
                                <img src={Captain_b}/>
                            </div>
                        </div>
                        <img src={wave} className='wave' />
                        <ReactWOW callback={handleAnimation} animation='fadeInUp' duration='0.8s' delay='0.3s'>
                            <div className="bn-title">
                                <img src={HOST_URL + pageData.images.title} />
                            </div>
                        </ReactWOW>
                    </>
                )}
                <div className="container">
                        <h3 className='points-block' dangerouslySetInnerHTML={{__html: sec[1].title}}></h3>
                        <div className='points-block' >
                            <h4 data-shadow={sec[2].title} dangerouslySetInnerHTML={{__html: sec[2].title}}></h4>
                            <div dangerouslySetInnerHTML={{__html: sec[2].content}}></div>
                        </div>
                        <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;