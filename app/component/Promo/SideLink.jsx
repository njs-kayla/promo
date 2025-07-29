import api from "@/service/api"

const SideLink = ({ data }) => {
    const { HOST_URL } = api()

    if (!data || data.length == 0) return null

    return (
        <div className="float-ad-list">
            {data.map((item, i) => (
                <a key={i} className="float-ad" href={process.env.NEXT_PUBLIC_BRAND === 'SG' ? "/enews/event" + item.url : item.url} target="_blank">
                    <img src={HOST_URL + item.img} />
                </a>
            ))}
        </div>
    )
}

export default SideLink