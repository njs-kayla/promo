import RWD from '@/service/RWD';

const BubbleEffect = () => {
    const { isMobile } = RWD()
    return (
        <div className='bubbles-area'>
            {Array.from({ length: isMobile ? 8 : 25 }).map((_, i) => {
                return (
                    <div key={i} className={`bubble-${i}`}></div>
                );
            })}
        </div>
    );
};

export default BubbleEffect;