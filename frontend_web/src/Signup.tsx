import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';


interface SignupProps {
    onNavigate: (page: 'signup' | 'login' | 'dashboard') => void;
}

export const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !password || !confirmPassword) {
            setError(t('allFieldsRequired'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }

        // Actual signup
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password, confirmPassword })
            });
            const data = await response.json();
            if (response.ok) {
                alert(t('registrationSuccess'));
                onNavigate('login');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            setError('Connection error');
        }
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-header">
                <h1 className="auth-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('signupTitle')}</h1>
                <p className="auth-subtitle" style={{ fontSize: '1.25rem' }}>{t('signupSubtitle')}</p>
            </div>

            <div className="card" style={{ padding: '3rem' }}>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '1rem', border: '1px solid #fee2e2', fontWeight: 500 }}>
                            {error}
                        </div>
                    )}

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" htmlFor="reg-name" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{t('nameLabel')}</label>
                        <input
                            id="reg-name"
                            type="text"
                            className="form-input"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ height: '3.5rem' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" htmlFor="reg-password" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{t('passwordLabel')}</label>
                        <input
                            id="reg-password"
                            type="password"
                            className="form-input"
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ height: '3.5rem' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                        <label className="form-label" htmlFor="confirm-password" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{t('confirmPasswordLabel')}</label>
                        <input
                            id="confirm-password"
                            type="password"
                            className="form-input"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ height: '3.5rem' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}>
                        {t('signupBtn')}
                    </button>
                </form>

                <div className="text-center mt-4" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', marginTop: '3rem' }}>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                        {t('haveAccount')}{' '}
                        <button
                            onClick={() => onNavigate('login')}
                            style={{ background: 'none', color: 'var(--primary)', fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem' }}
                        >
                            {t('loginLink')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
