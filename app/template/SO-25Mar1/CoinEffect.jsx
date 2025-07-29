import RWD from '@/service/RWD';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPublicImage } from '@/service/util';

const coin1 = getPublicImage(import.meta.url, 'coin/coin1.webp');
const coin2 = getPublicImage(import.meta.url, 'coin/coin2.webp');
const coin3 = getPublicImage(import.meta.url, 'coin/coin3.webp');
const coin4 = getPublicImage(import.meta.url, 'coin/coin4.webp');
const coin5 = getPublicImage(import.meta.url, 'coin/coin5.webp');
const coin6 = getPublicImage(import.meta.url, 'coin/coin6.webp');
const coin7 = getPublicImage(import.meta.url, 'coin/coin7.webp');
const coin8 = getPublicImage(import.meta.url, 'coin/coin8.webp');
const coin9 = getPublicImage(import.meta.url, 'coin/coin9.webp');
const coin10 = getPublicImage(import.meta.url, 'coin/coin10.webp');
const coin11 = getPublicImage(import.meta.url, 'coin/coin11.webp');
const coin12 = getPublicImage(import.meta.url, 'coin/coin12.webp');
const coin13 = getPublicImage(import.meta.url, 'coin/coin13.webp');
const coin14 = getPublicImage(import.meta.url, 'coin/coin14.webp');
const coin15 = getPublicImage(import.meta.url, 'coin/coin15.webp');


const coins = [coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8, coin9, coin10, coin11, coin12, coin13, coin14, coin15];

const CoinFrame = ({ startIndex }) => {
    const loading = useSelector((state) => state.loading.value);

    const [currentIndex, setCurrentIndex] = useState(startIndex);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % coins.length);
        }, 70);

        return () => clearInterval(interval);
    }, []);

        
    if (loading) return null;

    return (
        <div className="coin-frame" style={{ backgroundImage: `url(${coins[currentIndex]})` }} />
    );
};
const CoinEffect = () => {
    const { isMobile } = RWD();

    return (
        <div className='coins-area'>
            {Array.from({ length: isMobile ? 5 : 10 }).map((_, i) => {
                return (
                    <div key={i} className="coin">
                        <CoinFrame startIndex={Math.floor(Math.random() * 15) - 1} />
                    </div>
                );
            })}
        </div>
    );
};

export default CoinEffect;