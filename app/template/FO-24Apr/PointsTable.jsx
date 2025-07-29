import { Fragment, useEffect, useState } from "react";
import RWD from "@/service/RWD";
import { htmlImg } from '@/service/util';

const PointsTable = ({ htmlString }) => {
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
        const headers = []
        const tableData = [headers, data]
        const rows = Array.from(table.rows);
        rows.forEach((element, i) => {
            if (i === 0) {
                Array.from(element.cells).forEach((item) => {
                    headers.push(item.innerHTML)
                })
            } else {
                Array.from(element.cells).forEach((item) => {
                    data.push(item.innerHTML)
                })
            }
        });

        return tableData
    };

    
    return (isMobile && tableData) ? (
        <div className='points-block'>
            <h2 dangerouslySetInnerHTML={{ __html: headingElem }}></h2>
            <div className="points-colume-table">
                {tableData.map((type, index) => (
                    <Fragment key={index}>
                        {type.map((item, i) => (
                            <div key={item + i} className={index === 0 ? 'header-box' : `data-box data-box-${i}`}>{item}</div>
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    ) : (
        <div className="points-block" dangerouslySetInnerHTML={{__html: htmlImg(htmlString)}}></div>
    )
}

export default PointsTable