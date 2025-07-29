import { getPublicImage } from '@/service/util';
const flower1 = getPublicImage(import.meta.url, 'deco/flower-1.webp');
const flower2 = getPublicImage(import.meta.url, 'deco/flower-2.webp');
const flower3 = getPublicImage(import.meta.url, 'deco/flower-3.webp');


const BlossomEffect = () => {

    return (
        <div className='blossom-area'>
            {Array.from({ length: 30 }, (v, i) => i).map(((_, i) => (
                <img key={i} className='flower' src={flower1} alt="" />
            )))}
            {Array.from({ length: 30 }, (v, i) => i).map(((_, i) => (
                <img key={i} className='flower' src={flower2} alt="" />
            )))}
            {Array.from({ length: 30 }, (v, i) => i).map(((_, i) => (
                <img key={i} className='flower' src={flower3} alt="" />
            )))}
        </div>
    );
};

export default BlossomEffect;