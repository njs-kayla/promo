const contentFadeOut = () => {
    const elementsToFade = document.querySelectorAll('.logo, .title-area, .bn-date-heading, .bn-date-time, h3, h4, p, tr');

    const calculateValue = (innerHeight) => {
        const thresholdPercentage = 0.15;
        return innerHeight * thresholdPercentage;
    };

    const scrollHandler = () => {
        if ( scrollY > 0 && window.innerWidth > 820) {
            const windowHeight = window.innerHeight;
            const threshold = calculateValue(windowHeight);
            elementsToFade.forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (rect.top < threshold) {
                    element.classList.add('fade-out');
                } else {
                    element.classList.remove('fade-out');
                }
            });
        } else {
            elementsToFade.forEach((element) => {
                if (element.classList.contains('fade-out')) {
                    element.classList.remove('fade-out');
                }
            });
        }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
        window.removeEventListener('scroll', scrollHandler);
    };
};

export default contentFadeOut;