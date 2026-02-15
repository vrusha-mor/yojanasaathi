import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface ProfileProps {
    user: any;
    onUpdateUser?: (data: any) => void;
    onNavigate?: (page: any) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onNavigate }) => {
    const { t, language, setLanguage } = useLanguage();
    const [name, setName] = useState(user?.name || '');
    const [demographics, setDemographics] = useState({
        state: user?.state || '',
        gender: user?.gender || '',
        age: user?.age || '',
        caste: user?.caste || '',
        residence: user?.residence || '',
        income: user?.income || ''
    });
    const [mobile, setMobile] = useState('98765 43210'); // Mock data
    const [address, setAddress] = useState('Flat 101, Residency Park, New Delhi, India'); // Mock data

    // Update local state when prop changes
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setDemographics({
                state: user.state || '',
                gender: user.gender || '',
                age: user.age || '',
                caste: user.caste || '',
                residence: user.residence || '',
                income: user.income || ''
            });
        }
    }, [user]);

    const handleDemographicChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setDemographics({ ...demographics, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (onUpdateUser) {
            onUpdateUser({
                name,
                ...demographics
            });
        }
        alert(t('loggedInText').replace('logged in', 'updated profile') || 'Profile Updated!');
    };

    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
            {onNavigate && (
                <button onClick={() => onNavigate('dashboard')} className="btn-back">
                    <span className="btn-back-icon">←</span> {t('back')}
                </button>
            )}
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <h2 className="auth-title" style={{ margin: 0 }}>{t('myProfile')}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('languagePref')}:</span>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी (Hindi)</option>
                            <option value="mr">मराठी (Marathi)</option>
                            <option value="gu">ગુજરાતી (Gujarati)</option>
                            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                            <option value="kn">ಕನ್ನಡ (Kannada)</option>
                            <option value="ta">தமிழ் (Tamil)</option>
                            <option value="te">తెలుగు (Telugu)</option>
                            <option value="bn">বাংলা (Bengali)</option>
                            <option value="ml">മലയാളം (Malayalam)</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    {/* Sidebar / Avatar Area */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: 'var(--primary-light)',
                            borderRadius: '50%',
                            margin: '0 auto 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '3rem',
                            fontWeight: 'bold'
                        }}>
                            {name ? name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{name}</h3>
                        <span style={{
                            background: 'var(--success)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '99px',
                            fontSize: '0.8rem'
                        }}>
                            {t('aadhaarStatus')}: {t('linked')}
                        </span>

                        {/* Summary of Demographics */}
                        {demographics.state && (
                            <div style={{ marginTop: '1rem', textAlign: 'left', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}><strong>{t('stateLabel')}:</strong> {demographics.state}</div>
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}><strong>{t('ageLabel')}:</strong> {demographics.age}</div>
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}><strong>{t('casteLabel')}:</strong> {demographics.caste}</div>
                            </div>
                        )}
                    </div>

                    {/* Form Area */}
                    <div>
                        <h3 className="mb-2" style={{ color: 'var(--primary)' }}>{t('personalDetails')}</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div className="form-group">
                                <label className="form-label">{t('nameLabel')}</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('mobileNumber')}</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>

                            {/* Demographics Inputs */}
                            <div className="form-group">
                                <label className="form-label">{t('stateLabel')}</label>
                                <select name="state" className="form-input" value={demographics.state} onChange={handleDemographicChange}>
                                    <option value="">{t('selectState')}</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">{t('genderLabel')}</label>
                                    <select name="gender" className="form-input" value={demographics.gender} onChange={handleDemographicChange}>
                                        <option value="">{t('selectGender')}</option>
                                        <option value="Male">{t('male')}</option>
                                        <option value="Female">{t('female')}</option>
                                        <option value="Transgender">{t('transgender')}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('ageLabel')}</label>
                                    <input type="number" name="age" className="form-input" value={demographics.age} onChange={handleDemographicChange} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">{t('casteLabel')}</label>
                                    <select name="caste" className="form-input" value={demographics.caste} onChange={handleDemographicChange}>
                                        <option value="">{t('selectCategory')}</option>
                                        <option value="General">{t('general')}</option>
                                        <option value="OBC">{t('obc')}</option>
                                        <option value="SC">{t('sc')}</option>
                                        <option value="ST">{t('st')}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('residenceLabel')}</label>
                                    <select name="residence" className="form-input" value={demographics.residence} onChange={handleDemographicChange}>
                                        <option value="">{t('selectResidence')}</option>
                                        <option value="Urban">{t('urban')}</option>
                                        <option value="Rural">{t('rural')}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('incomeLabel')}</label>
                                <select name="income" className="form-input" value={demographics.income} onChange={handleDemographicChange}>
                                    <option value="">{t('selectIncome')}</option>
                                    <option value="0-1 Lakh">0 - 1 Lakh</option>
                                    <option value="1-2.5 Lakh">1 - 2.5 Lakhs</option>
                                    <option value="2.5-5 Lakh">2.5 - 5 Lakhs</option>
                                    <option value="5-8 Lakh">5 - 8 Lakhs</option>
                                    <option value="8+ Lakh">Above 8 Lakhs</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('address')}</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                                {t('saveChanges')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
