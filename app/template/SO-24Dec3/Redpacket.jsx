import rp1 from './assets/images/redpacket/1.webp';
import rp2 from './assets/images/redpacket/2.webp';
import rp3 from './assets/images/redpacket/3.webp';
import rp4 from './assets/images/redpacket/4.webp';
import rp5 from './assets/images/redpacket/5.webp';
import rp6 from './assets/images/redpacket/6.webp';

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