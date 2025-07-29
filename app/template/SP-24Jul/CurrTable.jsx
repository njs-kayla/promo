import { useEffect, useState } from "react";
import RWD from "@/service/RWD";
import { DropDown } from "@/component/Promo/DropDown";
import { getCurrByLang } from "@/service/util";

const CurrTable = ({ htmlString }) => {
    const [headingElem, setHeadingElem] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const { isMobile } = RWD()

    useEffect(() => {
        if (!htmlString) return
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const table = doc.querySelector('table');
        if (!table) return
        setHeadingElem(doc.querySelector('h3').innerHTML);
        setTableData(tableToJson(table))

    }, [htmlString])

    const tableToJson = (table) => {
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

            for (let j = 0; j < tableRow.cells.length; j++) {
                rowData[j] = tableRow.cells[j].innerHTML;
            }

            data.push(rowData);
        }

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
        if (!tableData) return;
        setSelectButton()
    }, [tableData])

    if (isMobile && tableData) {
        return (
            <div className='currency-block'>
                <h3 className="curr-heading" dangerouslySetInnerHTML={{ __html: headingElem }}></h3>
                <div className="curr-table">
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan="2">{tableData.headers[0]}</th>
                                {tableData.title && <th className="table-heading">{tableData.title}</th>}
                            </tr>
                            <tr><th>
                                <DropDown className={"currency-select"} button={tableData.headers[activeIndex]}>
                                    <ul className="list">
                                        {tableData.headers.map((curr, i) => {
                                            if (i > 0) return (
                                                <li onClick={() => setActiveIndex(i)} className={activeIndex == i ? 'active' : ''} key={curr}>{curr}</li>
                                            )
                                        })}
                                    </ul>
                                </DropDown></th></tr>
                        </thead>
                        <tbody>
                            {tableData.data.map((value, i) => (
                                <tr key={i}>
                                    <td>{value[0]}</td>
                                    <td>{value[activeIndex]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else return (
        <div className='currency-block' dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    )

}

export default CurrTable