import { useEffect, useState } from 'react';

const WaveEffect = () => {
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 15,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animate: false,
    }))
  );

  useEffect(() => {
    const updateBubbles = () => {
      const selectedIndex = Math.floor(Math.random() * 35);

      setBubbles(prevBubbles =>
        prevBubbles.map((bubble, index) => {
          if (index === selectedIndex) {
            return {
              ...bubble,
              animate: true,
            };
          }
          return bubble;
        })
      );

      setTimeout(() => {
        setBubbles(prevBubbles =>
          prevBubbles.map((bubble, index) => ({
            ...bubble,
            animate: index === selectedIndex ? false : bubble.animate,
          }))
        );
      }, 800);
    };

    const interval = setInterval(updateBubbles, 300);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="bubble-container">
      {bubbles.map(bubble => (
        <div key={bubble.id}
          className={`bubble ${bubble.animate ? 'animate' : ''}`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            '--size': `${bubble.size}px`
          }}>
        </div>
      ))}
    </div>
  );
};

export default WaveEffect;
