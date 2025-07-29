import './assets/scss/app.scss';
import "../../assets/fonts/Helvetica/style.css";
import "../../assets/fonts/SFProDisplay/style.css";
import "../../assets/fonts/Impact/style.css";
import "../../assets/fonts/NotoSerifTamil/style.css";
import { t } from 'i18next';
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import { htmlImg } from '@/service/util';
import MoreInfo from '@/component/Promo/MoreInfo';
import { useSelector } from 'react-redux';
import ExpBox from './expBox';
import AOS from 'aos';
import 'aos/dist/aos.css';
import parse, { domToReact } from 'html-react-parser';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');
const noCharBg = getPublicImage(import.meta.url, 'bg/no_char_bg.webp');
const peo = getPublicImage(import.meta.url, 'deco/peo.webp');



const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sections, setSections] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const slug = pageData?.customizeData?.slug || null;


    useEffect(() => {
        if (!loading) {
            AOS.init({ duration: 1200, once: true, disable: 'mobile' });
        }
        parseContent()

    }, [pageData, loading])

    const parseContent = () => {
        const { content, theme_type } = pageData;
        if (!content) return;

        const pattern = "<h";
        const secArr = content.split(pattern);
        const newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str);

        if (theme_type === 'A') {
            const section1 = parse(htmlImg(newSec[1]));

            let inserted = false;
            const section2 = parse(htmlImg(newSec[2]), {
                replace: (domNode) => {
                    if (domNode.name === 'h2' && !inserted) {
                        inserted = true;
                        return (
                            <>
                                {domToReact([domNode])}
                                {Object.keys(pageData.customizeData).length > 0 && (
                                    <ExpBox data={pageData.customizeData} />
                                )}
                            </>
                        );
                    }
                }
            });

            setSections([section1, section2]);
        } else {
            setSections([
                parse(htmlImg(newSec[1])),
                parse(htmlImg(newSec[2]))
            ]);
        }
    };

    return (
        <main className={loading ? `main-load type${pageData.theme_type} ${slug}` : `type${pageData.theme_type} ${slug}`}>
            <section className="banner">
                { isMobile && <img className="bn-bg" src={HOST_URL + pageData.images.mobile} alt="" />}
                {!isMobile &&
                    <>
                        { slug === 'Kplay' || slug === 'GWT' ? <img className="bn-bg" src={noCharBg} alt="" /> : <img className="bn-bg" src={bg} alt="" />}
                        <div className="bn-title">
                            <img data-aos="bounceInDown" style={{ animationDelay: '300ms', opacity: 0 }} src={HOST_URL + pageData.images.title} alt="" />
                        </div>
                        { slug !== 'Kplay' && slug !== 'GWT' && <div className="peo">
                            <img data-aos="bounceInDown" style={{ animationDelay: '700ms', opacity: 0 }} src={peo} alt="" />
                        </div>}
                        <div className="bonus">
                            <img data-aos="bounceInDown" style={{ animationDelay: '1100ms', opacity: 0 }} src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
            </section>
            {mergedArray(pageData.eventList).length > 1 && <EventGroup GMT={pageData.GMT} eventList={mergedArray(pageData.eventList)} />}
            <section className="index">
                <div className="container">
                    <div className="points-block">
                        {sections[0]}
                    </div>
                    <div className="points-block">
                        {sections[1]}
                    </div>
                    {isMobile ?
                        <MoreInfo html={pageData.terms_and_conditions} /> :
                        <div className='TC'>
                            <strong className='title'>{t('TermsConditions')}</strong>
                            <div className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;