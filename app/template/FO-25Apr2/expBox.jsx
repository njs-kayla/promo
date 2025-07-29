import i18n from '@/service/i18n';
import coin from './assets/images/deco/FS_coin.webp';

const ExpBox = ({ data }) => {
    const targetData = data[i18n.language];
    const unit = Object.keys(targetData)[1];
    
    return targetData && (
        <div className="ExpBox">
            <div className="box">
                <div className="exp">
                    <span>{targetData.exp}</span> EXP
                </div>
                <div className="coin"><img src={coin} alt="" /></div>
                <span>=</span>
                <dic className='currency'>
                    {unit} {targetData[unit]}
                </dic>
            </div>
            <div className="info">
                {targetData.info}
            </div>
        </div>
    )
}

export default ExpBox