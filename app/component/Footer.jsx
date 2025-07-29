import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <p className="copy-right" data-translate="Footer">
                {t('Footer', {
                    year: new Date().getFullYear(),
                    brand: process.env.brand === 'FS' ? 'Fastspin' : 'Spadegaming'
                })}
            </p>
        </footer>
    );
}

export default Footer;