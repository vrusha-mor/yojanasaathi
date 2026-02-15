import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import type { Language } from '../translations';

const LANGUAGES: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    return (
        <div className="language-selector" ref={containerRef} style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    color: '#1e293b',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
                <span style={{ fontSize: '1.2em' }}>🌐</span>
                <span>{currentLang.native}</span>
                <span style={{ fontSize: '0.8em', opacity: 0.5 }}>▼</span>
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '240px',
                    background: '#ffffff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    border: '1px solid #f1f5f9',
                    zIndex: 1000,
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <input
                        type="text"
                        placeholder="Search language..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '0.6rem 0.8rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem',
                            outline: 'none',
                            background: '#f8fafc',
                            color: '#334155'
                        }}
                    />

                    <div style={{ maxHeight: '280px', overflowY: 'auto' }} className="custom-scrollbar">
                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map(lang => (
                                <div
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    style={{
                                        padding: '0.6rem 0.8rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: language === lang.code ? '#eff6ff' : 'transparent',
                                        marginBottom: '2px',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (language !== lang.code) e.currentTarget.style.background = '#f8fafc';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (language !== lang.code) e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 500, fontSize: '0.95rem', color: '#1e293b' }}>{lang.native}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{lang.name}</span>
                                    </div>
                                    {language === lang.code && <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>✓</span>}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                                No languages found
                            </div>
                        )}
                    </div>
                </div>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e2e8f0;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #cbd5e1;
                }
            `}</style>
        </div>
    );
};
