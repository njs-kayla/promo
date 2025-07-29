'use client';
import { useState, useEffect } from 'react';

const BREAK_POINT = 768;

const RWD = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 確保是在瀏覽器中執行
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const isNowMobile = window.innerWidth <= BREAK_POINT;
            setIsMobile(isNowMobile);

            document.body.classList.toggle('mobile', isNowMobile);
        };

        handleResize(); // 初始化狀態
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile };
};

export default RWD;