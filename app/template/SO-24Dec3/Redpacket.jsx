import { getPublicImage } from '@/service/util';

const rp1 = getPublicImage(import.meta.url, 'redpacket/1.webp');
const rp2 = getPublicImage(import.meta.url, 'redpacket/2.webp');
const rp3 = getPublicImage(import.meta.url, 'redpacket/3.webp');
const rp4 = getPublicImage(import.meta.url, 'redpacket/4.webp');
const rp5 = getPublicImage(import.meta.url, 'redpacket/5.webp');
const rp6 = getPublicImage(import.meta.url, 'redpacket/6.webp');


const getRandomValue = (min, max) => {
    const rand = Math.random();
    return min + rand * (max - min);
};

const Redpackets = () => {
    const images = [rp1, rp2, rp3, rp4, rp5, rp6];
    const numCoins = images.length;

    const redpackets = Array.from({ length: numCoins }, (_, index) => ({
        x: index < 3 ? getRandomValue(150, (index + 1) * 350) : getRandomValue((index + 1) * -200, -130),
        y: getRandomValue(-800, -400),
        d: getRandomValue(2, 4),
        delay: getRandomValue(0, 10),
        init: index < 3 ? "60%" : "30%"
    }));
    

    return (
        <div className="wrap">
            {redpackets.map((redpacket, index) => (
                <div
                    key={index}
                    className="redpacket-item redpacket--animated"
                    style={{
                        '--redpacket-to-x': `${redpacket.x}px`,
                        '--redpacket-to-y': `${redpacket.y}px`,
                        '--redpacket-duration': `${redpacket.d}s`,
                        '--redpacket-delay': `${redpacket.delay}s`,
                        '--redpacket-init': `${redpacket.init}`
                    }}
                >
                    <img src={images[index]} alt={`Redpacket ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default Redpackets;