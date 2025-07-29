import redpacket1 from './assets/images/deco/img_RedPacket_1.webp';
import redpacket2 from './assets/images/deco/img_RedPacket_2.webp';
import redpacket3 from './assets/images/deco/img_RedPacket_3.webp';
import redpacket4 from './assets/images/deco/img_RedPacket_4.webp';
import { useEffect, useRef } from 'react';


const RedPacketEffect = () => {
    const packetsRef = useRef([]);

    useEffect(() => {
        const packets = packetsRef.current;

        const setRandomPosition = () => {
            packets.forEach((packet) => {
                const randomX = Math.random() * window.innerWidth;
                packet.style.left = `${randomX}px`;
                packet.style.top = `-100px`;
            });
        };

        // 初始化位置
        setRandomPosition();

        // 設置掉落動畫
        packets.forEach((packet) => {
            packet.style.animation = `fall ${3 + Math.random() * 2}s linear infinite`;
            packet.addEventListener('animationiteration', () => {
                const randomX = Math.random() * window.innerWidth;
                packet.style.left = `${randomX}px`;
            });
        });
    }, []);

    return (
        <div className='red-packet-area'>
            <img ref={(el) => (packetsRef.current[0] = el)} className='red-packet' src={redpacket1} alt="" />
            <img ref={(el) => (packetsRef.current[1] = el)} className='red-packet' src={redpacket2} alt="" />
            <img ref={(el) => (packetsRef.current[2] = el)} className='red-packet' src={redpacket3} alt="" />
            <img ref={(el) => (packetsRef.current[3] = el)} className='red-packet' src={redpacket4} alt="" />
        </div>
    );
};

export default RedPacketEffect;