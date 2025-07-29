import { Fragment, useEffect, useState } from "react";
import RWD from "@/service/RWD";

const PointTable = ({ htmlString, columeType = false, type = null, stroke = false, children }) => {
    const [headingElem, setHeadingElem] = useState(null);
    const [tableData, setTableData] = useState(null);
    const { isMobile } = RWD()

    useEffect(() => {
        if (!htmlString) return
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const table = doc.querySelector('table');
        if (!table) return
        setHeadingElem(doc.querySelector('h2,h3,h4').innerHTML);
        setTableData(tableToJson(table))

    }, [htmlString])

    const tableToJson = (table) => {
        const data = [];
        const headers = [];

        for (let j = 0; j <= 1; j++) {
            for (let i = 0; i < table.rows[j].cells.length; i++) {
                const value = table.rows[j].cells[i].innerHTML;
                if (j == 0) {
                    headers[i] = value;
                } else {
                    data[i] = value;
                }
            }
        }

        if (type === 'column') {
            return { headers, data };
        }

        if (headers.length % 2 == 0) {
            headers.push('-')
            data.push('-')
        }

        return { headers, data };
        
    }

    if ((isMobile || columeType) && tableData) {
        return (
            <div className='points-block'>
                <h3 dangerouslySetInnerHTML={{ __html: headingElem }}></h3>
                { stroke && <h3 className="title-stroke" dangerouslySetInnerHTML={{ __html: headingElem }}></h3>}
                <div className="points-colume-table">
                    {tableData.headers.map((item, i) => (
                        <div className="box" key={item}>
                            <div className="head">{item}</div>
                            <div className="value">{tableData.data[i]}</div>
                        </div>
                    ))}
                </div>
                { children }
            </div>
        )
    } else return (
        <div className='points-block' dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    )
}

export default PointTable