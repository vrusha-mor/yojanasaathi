import React from 'react';
import { useLanguage } from '../LanguageContext';

interface InfoPageProps {
    onBack: () => void;
}

export const PrivacyPolicy: React.FC<InfoPageProps> = ({ onBack }) => {
    const { t } = useLanguage();
    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
            <button onClick={onBack} className="btn-back">
                <span className="btn-back-icon">←</span> {t('back')}
            </button>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-2" style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>{t('privacyTitle')}</h1>
                <p className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>{t('privacySubtitle')}</p>
                <div style={{ lineHeight: '1.8', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                    {t('privacyContent')}
                </div>
            </div>
        </div>
    );
};

export const TermsOfUse: React.FC<InfoPageProps> = ({ onBack }) => {
    const { t } = useLanguage();
    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
            <button onClick={onBack} className="btn-back">
                <span className="btn-back-icon">←</span> {t('back')}
            </button>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-2" style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>{t('termsTitle')}</h1>
                <p className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>{t('termsSubtitle')}</p>
                <div style={{ lineHeight: '1.8', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                    {t('termsContent')}
                </div>
            </div>
        </div>
    );
};

export const HelpDesk: React.FC<InfoPageProps> = ({ onBack }) => {
    const { t } = useLanguage();
    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
            <button onClick={onBack} className="btn-back">
                <span className="btn-back-icon">←</span> {t('back')}
            </button>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-2" style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>{t('helpTitle')}</h1>
                <p className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>{t('helpSubtitle')}</p>
                <div style={{ lineHeight: '1.8', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                    {t('helpContent')}
                </div>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Contact Details</h3>
                    <p style={{ marginBottom: '0.5rem' }}>📧 <strong>Email:</strong> support@yojanasaathi.gov.in</p>
                    <p>📞 <strong>Toll-Free:</strong> 1800-111-2222</p>
                </div>
            </div>
        </div>
    );
};
