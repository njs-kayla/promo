import box from './assets/images/deco/img_box.webp';
import i18n from '@/service/i18n';
import { t } from "i18next"

const TreasureChest = ({ data }) => {
    return (
        <div className="treasure">
            <div className="exp">
              {data.exp} EXP
              <span>=</span>
            </div>
            <div className="box">
                <img src={box} alt="" />
                <dic className='currency'>
                    <div className="bg"></div>
                    <div className="text">
                        {t(`${data.currency[i18n.language] || data.currency["en-US"] }`)} {data.amount}
                    </div>
                </dic>
            </div>
        </div>
    )
}

export default TreasureChest