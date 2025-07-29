import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { useEffect, useState } from 'react';
import api from "@/service/api";
import { getPublicImage } from '@/service/util';

const arrow = getPublicImage(import.meta.url, 'deco/target.svg');


const GameSlider = ({ htmlStr }) => {
    if (!htmlStr) return null;
    const { HOST_URL } = api();
    const [imgSrcArray, setImgSrcArray] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const titleRegex = /<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/g;
        const regex = /<img[^>]+src="([^">]+)"/g;
        const newArr = []        

        let match;
        while ((match = regex.exec(htmlStr)) !== null) {
            newArr.push(HOST_URL + match[1]);
        }
        setImgSrcArray(newArr);

        while ((match = titleRegex.exec(htmlStr)) !== null) {
            setTitle(match[2]);
        }

    }, [htmlStr]);

    return (
        <div className="game-list-block">
            <h3 data-text={title}>{title}</h3>
            <Swiper
                effect={'coverflow'}
                modules={[Navigation, EffectCoverflow]}
                slidesPerView={2}
                grabCursor={true}
                navigation={{
                    nextEl: '.arrow-next',
                    prevEl: '.arrow-prev',
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: -50,
                    depth: 200,
                    modifier: 1,
                }}
                loop={true}
                centeredSlides={true}
                className='game-list-slider'
            >
                {imgSrcArray.map((imgSrc, index) => (
                    <SwiperSlide className='game-list-item' key={index}>
                        <img src={imgSrc} alt="" />
                    </SwiperSlide>
                ))}
                <div className="arrow-prev">
                    <img src={arrow} alt="" />
                </div>
                <div className="arrow-next">
                    <img src={arrow} alt="" />
                </div>
            </Swiper>
        </div>
    )
};

export default GameSlider;