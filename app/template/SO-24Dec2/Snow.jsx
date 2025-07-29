const Snow = () => {
    return (
        <div className="snow-area">
            { Array.from({ length: 100 }).map((_, i)=> (
                <span key={i} className="snow"></span>
            )) }
        </div>
    )
}

export default Snow;

