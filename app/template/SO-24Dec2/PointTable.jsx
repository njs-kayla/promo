import { Fragment, useEffect, useState } from "react";
import RWD from "@/service/RWD";

const PointTable = ({ htmlString, columeType = false }) => {
    const [headingElem, setHeadingElem] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [content, setContent] = useState(null);
    const [content2, setContent2] = useState(null);
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
        const headers = [];
        const data = [];
    
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            headers.push(table.rows[0].cells[i].innerHTML.replace(/ /gi, ''));
            data.push([]);
        }
    
        for (let j = 1; j < table.rows.length; j++) {
            for (let i = 0; i < table.rows[j].cells.length; i++) {
                const value = table.rows[j].cells[i].innerHTML.replace(/ /gi, '');
                data[i].push(value);
            }
        }
    
        return { headers, data };
    }
    
    

    if ((isMobile || columeType) && tableData) {
        return (
            <div className='points-block'>
                <h3 dangerouslySetInnerHTML={{ __html: headingElem }}></h3>
                <div className="table">
                    {tableData.headers.map((item, i) => (
                        <div className="box" key={item}>
                            <div className="head">{item}</div>
                            {tableData.data[i].map((item, i) => (
                                <div key={i} className="value" dangerouslySetInnerHTML={{__html: item}}></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    } else return (
        <div className='points-block' dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    )
}

export default PointTable