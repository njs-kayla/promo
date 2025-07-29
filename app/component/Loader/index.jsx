import { useSelector } from "react-redux";

const Loader = () => {
    const loading = useSelector((state) => state.loading.value);

    return (
        <div className="loading-mask" style={loading ? null : { display: 'none' }}>
            <span className="loading"></span>
        </div>
    )
}

export default Loader;