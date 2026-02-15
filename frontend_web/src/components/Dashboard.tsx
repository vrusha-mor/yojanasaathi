import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { SchemeChat } from './SchemeChat';
import { ScamChecker } from './ScamChecker';
import { FloatingChat } from './FloatingChat';
import { BasicInfoForm } from './BasicInfoForm';
import { MapComponent } from './MapComponent';

// Update Details Component
const UpdateDetails: React.FC<{ update: any, onBack: () => void }> = ({ update, onBack }) => {
    const { t } = useLanguage();

    const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
        const title = t(update.title as any);
        const text = `${title}\n\n${t(update.contentKey as any)}`;
        const url = window.location.href;

        let shareUrl = '';
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                break;
        }
        window.open(shareUrl, '_blank');
    };

    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
            <button onClick={onBack} className="btn-back">
                <span className="btn-back-icon">←</span> {t('back')}
            </button>

            <div className="card">
                <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
                    <img src={update.image} alt={t(update.title)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <span className="badge" style={{ background: '#e2e8f0', color: 'var(--text-main)' }}>{update.tag}</span>
                </div>

                <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>{t(update.title as any)}</h1>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '3rem' }}>
                    {t(update.contentKey as any)}
                </div>

                {update.applyLink && (
                    <div style={{ marginBottom: '2rem' }}>
                        <a
                            href={update.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem', width: '100%', textAlign: 'center', display: 'block' }}
                        >
                            Apply Now ➜
                        </a>
                    </div>
                )}

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                    <h4 className="mb-2">Share this update</h4>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            className="btn-share"
                            style={{ '--brand-color': '#25D366' } as React.CSSProperties}
                            onClick={() => handleShare('whatsapp')}
                            title="Share on WhatsApp"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.604 6.006L0 24l6.149-1.613a11.77 11.77 0 005.9 1.594h.005c6.632 0 12.028-5.398 12.03-12.03a11.79 11.79 0 00-3.48-8.513" />
                            </svg>
                        </button>
                        <button
                            className="btn-share"
                            style={{ '--brand-color': '#1877F2' } as React.CSSProperties}
                            onClick={() => handleShare('facebook')}
                            title="Share on Facebook"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>
                        <button
                            className="btn-share"
                            style={{ '--brand-color': '#000000' } as React.CSSProperties}
                            onClick={() => handleShare('twitter')}
                            title="Share on X"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpdateCarousel: React.FC<{ onSelect: (update: any) => void }> = ({ onSelect }) => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [shuffledUpdates, setShuffledUpdates] = useState<any[]>([]);

    useEffect(() => {
        const originalUpdates = [
            { id: 1, title: 'update1Title', desc: 'update1Desc', contentKey: 'update1Content', tag: 'NEW', image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1000', applyLink: 'https://pmkisan.gov.in/' },
            { id: 2, title: 'update2Title', desc: 'update2Desc', contentKey: 'update2Content', tag: 'URGENT', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000', applyLink: 'https://myaadhaar.uidai.gov.in/' },
            { id: 3, title: 'update3Title', desc: 'update3Desc', contentKey: 'update3Content', tag: 'Grants', image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=1000', applyLink: 'https://pmaymis.gov.in/' },
            { id: 4, title: 'update4Title', desc: 'update4Desc', contentKey: 'update4Content', tag: 'Student', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000', applyLink: 'https://scholarships.gov.in/' },
            { id: 5, title: 'update5Title', desc: 'update5Desc', contentKey: 'update5Content', tag: 'Welfare', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000' },
            { id: 6, title: 'update6Title', desc: 'update6Desc', contentKey: 'update6Content', tag: 'Finance', image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=80&w=1000', applyLink: 'https://www.mudra.org.in/' }
        ];

        // Randomize order on mount
        const shuffled = [...originalUpdates].sort(() => 0.5 - Math.random());
        setShuffledUpdates(shuffled);
    }, []);

    const slideCount = Math.ceil(shuffledUpdates.length / 3);

    const nextSlide = () => setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));

    if (shuffledUpdates.length === 0) return null;

    return (
        <div className="updates-section mb-4">
            <h2 className="mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {t('updatesTitle')}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={prevSlide} className="btn-secondary" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>←</button>
                    <button onClick={nextSlide} className="btn-secondary" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>→</button>
                </div>
            </h2>

            <div className="carousel-container">
                <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {Array.from({ length: slideCount }).map((_, slideIndex) => (
                        <div key={slideIndex} className="carousel-slide">
                            {shuffledUpdates.slice(slideIndex * 3, slideIndex * 3 + 3).map((item) => (
                                <div key={item.id} className="update-card card" style={{ padding: 0, cursor: 'pointer' }} onClick={() => onSelect(item)}>
                                    <div className="update-image-container">
                                        <img src={item.image} alt={t(item.title as any)} className="update-image" />
                                    </div>
                                    <div className="update-content">
                                        <span className="badge mb-2" style={{ background: '#e2e8f0', color: 'var(--text-main)' }}>{item.tag}</span>
                                        <h3 className="update-title">{t(item.title as any)}</h3>
                                        <p className="update-desc">{t(item.desc as any)}</p>
                                        <div className="read-more-btn mt-2">
                                            {t('readMore')} →
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel-dots">
                {Array.from({ length: slideCount }).map((_, idx) => (
                    <span key={idx} className={`dot ${currentSlide === idx ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)} />
                ))}
            </div>
        </div>
    );
};

interface DashboardProps {
    onUpdateUser?: (data: any) => void;
    user?: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ onUpdateUser, user }) => {
    const { t } = useLanguage();
    const [view, setView] = useState<'main' | 'chat' | 'scam' | 'map' | 'update-details'>('main');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUpdate, setSelectedUpdate] = useState<any>(null);

    const isProfileComplete = user?.income && user?.state;

    React.useEffect(() => {
        if (!isProfileComplete) {
            const timer = setTimeout(() => setIsFormOpen(true), 500);
            return () => clearTimeout(timer);
        }
    }, [isProfileComplete]);

    if (view === 'chat') return <><SchemeChat onBack={() => setView('main')} /></>;
    if (view === 'scam') return <ScamChecker onBack={() => setView('main')} />;
    if (view === 'update-details' && selectedUpdate) return <UpdateDetails update={selectedUpdate} onBack={() => setView('main')} />;
    if (view === 'map') return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem', height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setView('main')} className="btn-back">
                <span className="btn-back-icon">←</span> {t('back')}
            </button>
            <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <MapComponent userState={user?.state} userDistrict={user?.district} />
            </div>
        </div>
    );

    const handleUpdateSelect = (update: any) => {
        setSelectedUpdate(update);
        setView('update-details');
    };

    const handleFormSearch = () => {
        setView('chat');
        setIsFormOpen(false);
    };

    const handleFormSave = (data: any) => {
        if (onUpdateUser) onUpdateUser(data);
    };

    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '6rem' }}>
            <FloatingChat onClick={() => setView('chat')} />
            <BasicInfoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSearch={handleFormSearch} onSave={handleFormSave} />

            {/* Hero Section */}
            {!isProfileComplete && (
                <div className="hero-banner">
                    <div style={{ flex: '1 1 300px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>{t('findSchemes')}</h2>
                        <p style={{ opacity: 0.9, fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '600px' }}>{t('findSchemesDesc')}</p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="btn"
                        style={{
                            background: 'white',
                            color: 'var(--primary)',
                            padding: '1.25rem 3rem',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                        }}
                    >
                        {t('findSchemes')} →
                    </button>
                </div>
            )}

            <UpdateCarousel onSelect={handleUpdateSelect} />

            <h2 className="mb-4 mt-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '6px', height: '24px', background: 'var(--secondary)', borderRadius: '4px', display: 'inline-block' }}></span>
                {t('servicesTitle')}
            </h2>

            <div className="services-grid">
                <div className="service-card" onClick={() => setView('chat')}>
                    <div className="service-header">
                        <div className="service-icon-wrapper">🤖</div>
                    </div>
                    <div className="service-body">
                        <h3 className="service-title">Ask Sahayak (AI)</h3>
                        <p className="service-desc">{t('findSchemesDesc')}</p>
                    </div>
                    <div className="service-footer">
                        <span>Chat Now</span>
                        <span className="arrow-icon">→</span>
                    </div>
                </div>

                <div className="service-card" onClick={() => setView('scam')}>
                    <div className="service-header">
                        <div className="service-icon-wrapper">🛡️</div>
                    </div>
                    <div className="service-body">
                        <h3 className="service-title">{t('scamChecker')}</h3>
                        <p className="service-desc">{t('scamCheckerDesc')}</p>
                    </div>
                    <div className="service-footer">
                        <span>Verify Now</span>
                        <span className="arrow-icon">→</span>
                    </div>
                </div>

                <div className="service-card" onClick={() => setView('map')}>
                    <div className="service-header">
                        <div className="service-icon-wrapper">📍</div>
                    </div>
                    <div className="service-body">
                        <h3 className="service-title">{t('nearbyOffices')}</h3>
                        <p className="service-desc">{t('nearbyOfficesDesc')}</p>
                    </div>
                    <div className="service-footer">
                        <span>Locate</span>
                        <span className="arrow-icon">→</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
