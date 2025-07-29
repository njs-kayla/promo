import { Children, cloneElement, useEffect, useRef, useState } from "react";
import RWD from '@/service/RWD'

export const DropDown = ({ children, className, button, type }) => {
    const ref = useRef();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        // 關閉彈窗事件
        const bodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            } else {
                setOpen(false)
            }
        };
        document.body.addEventListener("click", bodyClick);

        // component destroy
        return () => {
            document.body.removeEventListener("click", bodyClick);
        };
    }, [])

    const { isMobile } = RWD()

    return (
        <div className={`${className} dropdown`}>
            <button ref={ref} onClick={(e) => setOpen(!open)} className={`dropdown-btn default ${open ? 'active' : ''}`}>{button}</button>
            {Children.map(children, (child, index) =>
                cloneElement(child, {
                    className: `dropdown-list ${child.props.className} ${open ? 'active' : ''}`,
                    children: (
                        <>
                            {child.props.children}
                            {(index === 0 && type === 'mixTable' && isMobile) &&
                            <button onClick={(e) => setOpen(!open)} className="btn-close-list">
                                <span className="icon-close"></span>
                            </button>}
                        </>
                    )
                })
            )}
        </div>
    )
}