import flower from './assets/images/deco/flower.webp';
import RWD from '@/service/RWD';

const BlossomEffect = () => {
    const { isMobile } = RWD()
    return (
        <div className='blossom-area'>
            {Array.from({ length: isMobile ? 5 : 20 }).map((_, i) => {
                const sizeClass = Math.random() > 0.5 ? 'front' : 'back';
                return (
                    <img key={i} className={`flower ${sizeClass}`} src={flower} alt="" />
                );
            })}
        </div>
    );
};

export default BlossomEffect;