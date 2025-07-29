import { t } from "i18next"
import { useDispatch, useSelector } from "react-redux"
import { showModal } from "../../component/Modal/modalSlice"
import Modal from "../../component/Modal";
import infoIcon from '../../assets/images/icon/info.svg';
import { useEffect, useState } from 'react';

const MoreBtn = ({ html }) => {
    const dispatch = useDispatch();
    const [ isScrolled, setIsScroll ] = useState(false);
    const isModalOpen = useSelector(state => state.modal.value);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
              setIsScroll('scrolled');
            } else {
              setIsScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isModalOpen])

    
    return (
        <>
            <button className={`btn-moreInfo ${isScrolled} ${isModalOpen ? 'open' : ''}`} onClick={(e) => dispatch(showModal(true)) && e.stopPropagation()}>
                <span><img src={infoIcon} alt="" /></span>
            </button >
            <Modal type={'info'}>
                <strong className='title'>{t('TermsConditions')}</strong>
                <div className='content' dangerouslySetInnerHTML={{ __html: html }}></div>
            </Modal>
        </>
    )
}

export default MoreBtn