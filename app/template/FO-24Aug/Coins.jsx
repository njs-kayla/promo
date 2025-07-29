const getRandomValue = (min, max) => Math.random() * (max - min) + min;

const Coins = () => {
    const numCoins = 8;

    const coins = Array.from({ length: numCoins }, () => ({
        x: getRandomValue(-650, 650),
        y: getRandomValue(-400, -360),
        d: getRandomValue(2.5, 5.5),
        delay: getRandomValue(0, 1.5)
    }));

    return (
        <div className="wrap">
            {coins.map((coin, index) => (
                <div
                    key={index}
                    className="coin-item coin--animated"
                    style={{
                        '--coin-to-x': `${coin.x}px`,
                        '--coin-to-y': `${coin.y}px`,
                        '--coin-duration': `${coin.d}s`,
                        '--coin-delay': `${coin.delay}s`
                    }}
                ></div>
            ))}
        </div>
    );
};

export default Coins