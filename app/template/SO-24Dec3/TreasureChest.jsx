import i18n from '@/service/i18n';
import { t } from "i18next"

const TreasureChest = ({ data }) => {
    return (
        <div className="treasure">
            <div className="exp">
                {data.exp} EXP
                <span>=</span>
            </div>
            <div className='currency'>
                <div className="text">
                    {t(`${data.currency[i18n.language] || data.currency["en-US"]}`)} {data.amount}
                </div>
            </div>
        </div>
    )
}

export default TreasureChest