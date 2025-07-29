import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { showModal } from "./modalSlice";
import { useEffect, useRef } from "react";

const Modal = ({ type, children }) => {
    const ref = useRef();
    const show = useSelector((state) => state.modal.value);
    const dispatch = useDispatch()

    useEffect(() => {
        // 關閉彈窗事件
        const bodyClick = (event) => {
            if (show && ref.current && ref.current.contains(event.target)) {
                return;
            } else {
                dispatch(showModal(false))
            }
        };
        document.body.addEventListener("click", bodyClick);

        // component destroy
        return () => {
            document.body.removeEventListener("click", bodyClick);
        };
    }, [])

    if (!show) return null

    return (
        <>{createPortal(
            <div className={`modal ${type}`}>
                <div className={`modal-box ${type} ${ type === 'info' ? 'slideOut' : 'blowUpModal'}`} ref={ref}>
                    <button className="btn-close" onClick={() => dispatch(showModal(false))}>
                        <i className="icon-close"></i>
                    </button>
                    {children}
                </div>
            </div>,
            document.body)}
        </>
    )
}

export default Modal