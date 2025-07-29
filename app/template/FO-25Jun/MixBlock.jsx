import { useEffect, useState, useRef } from 'react';
import i18n from "@/service/i18n";

const MixBlock = ({data}) => {
    let targetData = data[i18n.language]
    
    return <div className='table-wrap'>
        { targetData.map((item, i) => (
            <div key={i} className="data-item">
                <div className="title">{item.title}</div>
                <div className="value">{
                    item.value.split(' ').map((item, i) => (
                        <span key={i}>{item}</span>
                    ))
                }</div>
            </div>
        )) }
    </div>
}

export default MixBlock;