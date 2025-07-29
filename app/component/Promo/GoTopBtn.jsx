import { useEffect, useState } from "react";

const GoTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 監聽滾動事件，以便根據滾動位置來判斷是否顯示按鈕
        const handleScroll = () => {
            const windowH = window.innerHeight / 4;
            if (window.scrollY > windowH) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 組件卸載時，移除事件監聽器
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button onClick={() => scrollToTop()} className={`go-top-btn ${isVisible ? 'active' : ''}`}>
            <i className="icon-upward"></i>
        </button>
    )

}

export default GoTopBtn