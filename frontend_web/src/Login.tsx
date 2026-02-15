import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';


interface LoginProps {
    onNavigate: (page: 'signup' | 'login' | 'dashboard') => void;
    onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        if (name && password) {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, password })
                });
                const data = await response.json();
                if (response.ok) {
                    onLogin(name);
                    onNavigate('dashboard');
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                alert('Connection error');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-header">
                <h1 className="auth-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('loginTitle')}</h1>
                <p className="auth-subtitle" style={{ fontSize: '1.25rem' }}>{t('loginSubtitle')}</p>
            </div>

            <div className="card" style={{ padding: '3rem' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label className="form-label" htmlFor="name" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{t('nameLabel')}</label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ height: '3.5rem' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label className="form-label" htmlFor="password" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{t('passwordLabel')}</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ height: '3.5rem' }}
                        />
                    </div>

                    <div className="mb-4" style={{ textAlign: 'right' }}>
                        <button type="button" className="btn-link" style={{ background: 'none', color: 'var(--primary)', fontSize: '1rem', fontWeight: 600 }}>
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}>
                        {t('loginBtn')}
                    </button>
                </form>

                <div className="text-center mt-4" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', marginTop: '3rem' }}>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                        {t('noAccount')}{' '}
                        <button
                            onClick={() => onNavigate('signup')}
                            style={{ background: 'none', color: 'var(--primary)', fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem' }}
                        >
                            {t('registerLink')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
