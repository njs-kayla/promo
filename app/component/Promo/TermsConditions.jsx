import { t } from "i18next"

const TermsConditions = ({ htmlString }) => {
    return (
        <>
            <h3 className='title'>{t('TermsConditions')}</h3>
            <div className='content' dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        </>
    )
}

export default TermsConditions