import React from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';
import { AccessibilityControls } from './components/AccessibilityControls';

interface NavbarProps {
    onNavigate: (page: any) => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, isLoggedIn, onLogout }) => {
    const { t } = useLanguage();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <div className="brand" onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')} style={{ cursor: 'pointer' }}>
                    <img src="/logo.png" alt={t('appTitle')} className="emblem" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <AccessibilityControls />
                    <LanguageSelector />

                    {isLoggedIn && (
                        <>
                            <button
                                onClick={() => onNavigate('dashboard')}
                                style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}
                            >
                                {t('navHome')}
                            </button>
                            <button
                                onClick={() => onNavigate('profile')}
                                style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}
                            >
                                {t('navProfile')}
                            </button>
                            <button
                                onClick={onLogout}
                                className="btn btn-secondary"
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                            >
                                {t('navLogout')}
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {t('subtitle')}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
