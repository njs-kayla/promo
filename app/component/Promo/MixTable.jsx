import { useEffect, useState, useMemo } from "react";
import RWD from "@/service/RWD";
import { DropDown } from "./DropDown";
import { getCurrByLang, getOrdinalSuffix, htmlImg } from '@/service/util';
import i18n from "@/service/i18n";
import { t } from "i18next"


const MixTable = ({ prizeList, pointsSystem, gameList = null, heading = null }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [headingElem, setHeadingElem] = useState(null);

    // 使用 useMemo 確保 CurrencyList 只在 prizeList 變動時更新
    const CurrencyList = useMemo(() => {
        return Object.keys(prizeList).filter(item => item !== 'rank');
    }, [prizeList]);
    const activeLan = i18n.language === 'zh-CN' ? 'CNY' : getCurrByLang();

    useEffect(() => {
        const index = CurrencyList.indexOf(activeLan);
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [activeLan, CurrencyList]);

    const handleClick = (i) => {
        setActiveIndex(i)
    }

    const currentPrizeData = prizeList[CurrencyList[activeIndex]];

    useEffect(() => {
        if (heading) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(heading, 'text/html');
            const headingElem = doc.querySelector('h2');
            setHeadingElem(headingElem.innerHTML.replace('amp;', ''));
        }
    }, [heading])

    return (
        <div className="mix-table">
            <h2 data-text={heading ? headingElem : t('PrizesCurrencies')} className="mix-table-head">{heading ? headingElem : t('PrizesCurrencies')}</h2>
            <DropDown className={"currency-select"} button={t(CurrencyList[activeIndex])} type={'mixTable'}>
                <ul className="list">
                    {CurrencyList.map((curr, i) => (
                        <li className={i === activeIndex ? "active" : ''} onClick={() => handleClick(i)} key={curr}>
                            {t(curr)}
                        </li>
                    ))}
                </ul>
            </DropDown>
            <div className="grid-wrap">
                {currentPrizeData.length > 6 ? <div className="top-three-box">
                    <h2>{t('WCP')}</h2>
                    <div className="content-box">
                        {currentPrizeData.map((data, i) => {
                            if (i > 2) return;
                            return <div key={i} className="prize-box">
                                <div className="ranking">
                                    <div className="content">
                                        <span>{(i + 1)}</span>
                                        <span className="ordinal">{getOrdinalSuffix(i + 1)}</span>
                                    </div>
                                </div>
                                <div className="value">{data}</div>
                            </div>
                        })}
                    </div>
                </div> : <div className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(gameList) }}></div>}
                <div className="rank-list-box">
                    <div className="content-box">
                        <h2>{t('Ranking')}</h2>
                        {currentPrizeData.map((data, i) => {
                            if (currentPrizeData.length > 6 && i < 3) return null;

                            return (
                                <div key={i} className="prize-box">
                                    <div className="ranking">{prizeList.rank[i]}</div>
                                    <div className="value">{data}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="points-system-box">
                    <h2>{t('TPS')}</h2>
                    <div className="content-box">
                        <div className="points">
                            <span className="number">{pointsSystem.Points}</span>
                            <span className="text">{t('Points')}</span>
                        </div>
                        <span className="equal">=</span>
                        <div className="currency">
                            <span>{pointsSystem[CurrencyList[activeIndex]]}</span>
                            {CurrencyList[activeIndex]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MixTable;