import { useEffect, useState } from "react";
import RWD from "@/service/RWD";
import { DropDown } from "@/component/Promo/DropDown";

const Table = ({ htmlString }) => {
    const [headingElem, setHeadingElem] = useState(null);
    const [tableText, setTableText] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const [newHtmlString, setNewHtmlString] = useState(null);
    const { isMobile } = RWD()

    useEffect(() => {
        if (!htmlString) return
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const table = doc.querySelector('table');
        if (!table) return
        setHeadingElem(doc.querySelector('h3').innerHTML);
        setTableText(doc.querySelector('p')?.innerHTML)
        setTableData(tableToJson(table))
        console.log(tableToJson(table));
        tdAddSpan()

    }, [htmlString])

    const tableToJson = (table) => {
        const data = [];
        const headers = [];
        let level = ""
        const title = table.querySelector('th[colspan]')?.innerHTML || null;
        const hasTitle = title != null

        // 遍歷表格的標題行，將標題存儲到 headers 數組中
        headers[0] = table.rows[0].cells[0].innerHTML

        const startIndex = hasTitle ? 1 : 0;
        for (let i = 0; i < table.rows[startIndex].cells.length; i++) {
            if (i == 0) {
                level = table.rows[startIndex].cells[i].innerHTML.replace(/ /gi, '');
            } else {
                headers[i + (startIndex - 1)] = table.rows[startIndex].cells[i].innerHTML.replace(/ /gi, '');
            }
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

        return { title, headers, data, level };
    } 

    const tdAddSpan = () => {
        var modifiedHtmlString = htmlString.replace(/<td(?:\s+colspan="(\d+)")?[^>]*>([^<]*)<\/td>/g, function(match, colspan, content) {
            if (colspan !== undefined) {
                return '<td colspan="' + colspan + '"><span>' + content + '</span></td>';
            } else {
                return '<td><span>' + content + '</span></td>';
            }
        });
        setNewHtmlString(modifiedHtmlString)
    }

    if (isMobile && tableData) {
        return tableData.headers.length >= 3 ? (
            <div className='currency-block'>
                <h3 className="curr-heading" dangerouslySetInnerHTML={{ __html: headingElem }}></h3>
                <div className="curr-table">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <div className="flex">
                                        {tableData.headers[0]}
                                        <DropDown className={"currency-select"} button={tableData.headers[activeIndex]}>
                                            <ul className="list">
                                                {tableData.headers.map((curr, i) => {
                                                    if (i > 0) return (
                                                        <li onClick={() => setActiveIndex(i)} className={activeIndex == i ? 'active' : ''} key={curr}>{curr}</li>
                                                    )
                                                })}
                                            </ul>
                                        </DropDown>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{tableData.level}</td>
                                <td>{tableData.headers[activeIndex]}</td>
                            </tr>
                            {tableData.data.map((value, i) => {
                                return value.length > 1 ? (
                                    <tr key={i}>
                                        <td>{value[0]}</td>
                                        <td>{value[activeIndex]}</td>
                                    </tr>
                                ) : (
                                    <tr key={i}>
                                        <td colSpan={2}>{value[0]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {tableText && <p className="curr-text" dangerouslySetInnerHTML={{__html: tableText}}></p>}
            </div>
        ) : (
            <div className='currency-block' dangerouslySetInnerHTML={{ __html: newHtmlString }}></div>
        )
    } else return (
        <div className='currency-block' dangerouslySetInnerHTML={{ __html: newHtmlString }}></div>
    )

}

export default Table