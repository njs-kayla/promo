import RWD from '@/service/RWD';
import coin1 from './assets/images/coin/coin1.webp';
import coin2 from './assets/images/coin/coin2.webp';
import coin3 from './assets/images/coin/coin3.webp';
import coin4 from './assets/images/coin/coin4.webp';
import coin5 from './assets/images/coin/coin5.webp';
import coin6 from './assets/images/coin/coin6.webp';
import coin7 from './assets/images/coin/coin7.webp';
import coin8 from './assets/images/coin/coin8.webp';
import coin9 from './assets/images/coin/coin9.webp';
import coin10 from './assets/images/coin/coin10.webp';
import coin11 from './assets/images/coin/coin11.webp';
import coin12 from './assets/images/coin/coin12.webp';
import coin13 from './assets/images/coin/coin13.webp';
import coin14 from './assets/images/coin/coin14.webp';
import coin15 from './assets/images/coin/coin15.webp';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
            {Array.from({ length: isMobile ? 5 : 50 }).map((_, i) => {
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