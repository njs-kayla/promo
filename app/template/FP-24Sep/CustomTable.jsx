import { Fragment, useEffect, useState } from "react";
import RWD from "@/service/RWD";
import { DropDown } from "@/component/Promo/DropDown";
import { getCurrByLang, getPublicImage } from '@/service/util';

const rank_1st = getPublicImage(import.meta.url, 'deco/mb/rank_1st.webp');
const rank_2nd = getPublicImage(import.meta.url, 'deco/mb/rank_2nd.webp');
const rank_3rd = getPublicImage(import.meta.url, 'deco/mb/rank_3rd.webp');
const diamond = getPublicImage(import.meta.url, 'deco/mb/diamond.webp');


const CustomTable = ({ htmlString, type = "column" }) => {
    const [headingElem, setHeadingElem] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const { isMobile } = RWD()

    useEffect(() => {
        if (!htmlString) return
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const heading = doc.querySelector('h2')?.innerHTML
        setHeadingElem(heading)
        const table = doc.querySelector('table');
        if (!table) return
        if (type === "column") {
            setTableData(tableToJson(table))
        } else {
            setTableData(tableToJsonV2(table))
        }

    }, [htmlString])

    const tableToJson = (table) => {
        const result = [];

        for (let i = 0; i < table.rows[0].cells.length; i++) {
            const header = table.rows[0].cells[i].innerHTML.replace(/ /gi, '');
            result.push({ header, data: [] });
        }

        for (let j = 1; j < table.rows.length; j++) {
            for (let i = 0; i < table.rows[j].cells.length; i++) {
                const value = table.rows[j].cells[i].innerHTML.replace(/ /gi, '');
                result[i].data.push(value);
            }
        }

        return result;
    };

    function formatNumber(number) {
        let formattedNumber;
        if (number >= 1e9) { // 大於或等於十億
            formattedNumber = number / 1e9;
            return formattedNumber % 1 === 0 ? Math.round(formattedNumber) + 'B' : formattedNumber.toFixed(1) + 'B';
        } else if (number >= 1e6) { // 大於或等於百萬
            formattedNumber = number / 1e6;
            return formattedNumber % 1 === 0 ? Math.round(formattedNumber) + 'M' : formattedNumber.toFixed(1) + 'M';
        } else if (number >= 1e3) { // 大於或等於千
            formattedNumber = number / 1e3;
            return formattedNumber % 1 === 0 ? Math.round(formattedNumber) + 'K' : formattedNumber.toFixed(1) + 'K';
        } else {
            return number.toString(); // 小於千
        }
    }


    const tableToJsonV2 = (table) => {
        const data = [];
        const headers = [];
        const title = table.querySelector('th[colspan]')?.innerHTML || null;
        const hasTitle = title != null

        // 遍歷表格的標題行，將標題存儲到 headers 數組中
        headers[0] = table.rows[0].cells[0].innerHTML.replace(/ /gi, '')

        const startIndex = hasTitle ? 1 : 0;
        for (let i = 0; i < table.rows[startIndex].cells.length; i++) {
            headers[i + (startIndex)] = table.rows[startIndex].cells[i].innerHTML.replace(/ /gi, '');
        }

        // 遍歷表格的數據行，將每一行的數據存儲到 data 數組中
        for (let i = (hasTitle ? 2 : 1); i < table.rows.length; i++) {
            const tableRow = table.rows[i];
            const rowData = [];
            console.log(tableRow);
            

            for (let j = 0; j < tableRow.cells.length; j++) {
                let cell = tableRow.cells[j];

                if (cell.tagName.toLowerCase() === 'th') {
                    let cellContent = tableRow.cells[j].innerHTML;
                    rowData[j] = cellContent
                } else {
                    let cellContent = tableRow.cells[j].innerHTML.replace(/,/g, "");
                    let number = parseFloat(cellContent);

                    if (!isNaN(number)) {
                        rowData[j] = formatNumber(number);
                    } else {
                        rowData[j] = cellContent;
                    }
                }
            }

            data.push(rowData);
        }

        console.log({ title, headers, data });
        


        return { title, headers, data };
    }

    const setSelectButton = () => {
        tableData.headers.forEach((item, i) => {
            if (item === getCurrByLang()) {
                setActiveIndex(i)
            }
        })
    }
    useEffect(() => {
        if (!tableData || type === 'column') return;
        setSelectButton()
    }, [tableData])

    const pairImg = [rank_1st.src, rank_2nd.src, rank_3rd.src];

    if (!tableData) return

    return type === 'column' ? (
        <div className='info-block'>
            <h2 dangerouslySetInnerHTML={{ __html: headingElem }}></h2>
            <div className="custom-table">
                <div className="table-header">{tableData[0].header} {tableData[0].data[0]}</div>
                {tableData.map((item, i) => {
                    if (i == 0) return;
                    return <div key={i} className={`box ${ isMobile 
                        ? (tableData.length - 1 - ((tableData.length - 1) % 2) === i? "row-span" : "") 
                        : (tableData.length - 1 - ((tableData.length - 1) % 4) === i ? "row-span" : "")}`}>
                        <div className="head">{item.header}</div>
                        <div className="value">{item.data[0]}</div>
                    </div>
                })}
            </div>
        </div>
    ) : (
        <div className='info-block'>
            <h2 dangerouslySetInnerHTML={{ __html: headingElem }}></h2>
            <DropDown className={"currency-select"} button={tableData?.headers[activeIndex]}>
                <ul className="list">
                    {tableData?.headers.map((curr, i) => {
                        if (i > 0) return (
                            <li onClick={() => setActiveIndex(i)} className={activeIndex == i ? 'active' : ''} key={curr}>{curr}</li>
                        )
                    })}
                </ul>
            </DropDown>
            <div className="board">
                <div className="header-bar">
                    {tableData.data.map((value, i) => {
                        if (i < 3) {
                            return (
                                <div className={`position type-${i + 1}`}>
                                    <img className="rank" src={pairImg[i]} alt="" />
                                    <div className='score'>
                                        <img className="diamond" src={diamond} alt="" />
                                        <span>{value[activeIndex]}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="content">
                    <div dangerouslySetInnerHTML={{__html: tableData.headers[0]}} className="head"></div>
                    <ol>
                        {tableData.data.map((value, i) => {
                            if (i > 2) {
                                return <li key={i}>
                                    <span dangerouslySetInnerHTML={{__html: value[0]}}></span>
                                    <span className="yellow">
                                        <img className="diamond" src={diamond} alt="" />
                                        {value[activeIndex]}
                                    </span>
                                </li>
                            }
                        }
                        )}
                    </ol>
                </div>
            </div>

        </div>
    )

}

export default CustomTable