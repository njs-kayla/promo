import flower1 from './assets/images/deco/flower-1.webp';
import flower2 from './assets/images/deco/flower-2.webp';
import flower3 from './assets/images/deco/flower-3.webp';


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