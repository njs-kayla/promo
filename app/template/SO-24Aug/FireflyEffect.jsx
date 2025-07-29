const FireflyEffect = () => {
    return (
        <div className="animation_cover">
            {Array.from({ length: 25 }, (v, i) => i).map(((_, i) => (
                <div key={i} class="firefly"></div>
            )))}
        </div>
    )
}

export default FireflyEffect;