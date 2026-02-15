import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { INDIAN_STATES_AND_DISTRICTS } from '../data/indian_states_districts';


interface BasicInfoFormProps {
    onSearch: (criteria: any) => void;
    // We can add onClose if we want to make it a modal
    isOpen?: boolean;
    onClose?: () => void;
    onSave?: (data: any) => void;
}

// export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onSearch, isOpen, onClose, onSave }) => {
export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ isOpen, onClose, onSave }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        state: '',
        district: '',
        gender: '',
        age: '',
        caste: '',
        residence: '',
        income: ''
    });

    const [districts, setDistricts] = useState<string[]>([]);

    React.useEffect(() => {
        if (formData.state && INDIAN_STATES_AND_DISTRICTS[formData.state]) {
            setDistricts(INDIAN_STATES_AND_DISTRICTS[formData.state]);
            // Reset district if it doesn't belong to the new state
            if (formData.district && !INDIAN_STATES_AND_DISTRICTS[formData.state].includes(formData.district)) {
                setFormData(prev => ({ ...prev, district: '' }));
            }
        } else {
            setDistricts([]);
            setFormData(prev => ({ ...prev, district: '' })); // Also clear district if state is cleared
        }
    }, [formData.state]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) onSave(formData);
        if (onClose) onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div className="card" style={{
                width: '95%',
                maxWidth: '650px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: '#f1f5f9',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        fontSize: '1.2rem',
                        color: '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
                >×</button>

                <div className="text-center mb-4">
                    <h2 className="mb-2" style={{ fontSize: '1.75rem' }}>{t('findSchemes')}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Help us customize recommendations for you.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">{t('stateLabel')}</label>
                        <div style={{ position: 'relative' }}>
                            <select name="state" className="form-input" value={formData.state} onChange={handleChange} required>
                                <option value="">{t('selectState')}</option>
                                {Object.keys(INDIAN_STATES_AND_DISTRICTS).sort().map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">District</label>
                        <select name="district" className="form-input" value={formData.district} onChange={handleChange} required disabled={!formData.state}>
                            <option value="">Select District</option>
                            {districts.map(dist => (
                                <option key={dist} value={dist}>{dist}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">{t('genderLabel')}</label>
                        <select name="gender" className="form-input" value={formData.gender} onChange={handleChange} required>
                            <option value="">{t('selectGender')}</option>
                            <option value="Male">{t('male')}</option>
                            <option value="Female">{t('female')}</option>
                            <option value="Transgender">{t('transgender')}</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">{t('ageLabel')}</label>
                        <input
                            type="number"
                            name="age"
                            className="form-input"
                            placeholder="e.g. 25"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">{t('casteLabel')}</label>
                        <select name="caste" className="form-input" value={formData.caste} onChange={handleChange} required>
                            <option value="">{t('selectCategory')}</option>
                            <option value="General">{t('general')}</option>
                            <option value="OBC">{t('obc')}</option>
                            <option value="SC">{t('sc')}</option>
                            <option value="ST">{t('st')}</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">{t('residenceLabel')}</label>
                        <select name="residence" className="form-input" value={formData.residence} onChange={handleChange} required>
                            <option value="">{t('selectResidence')}</option>
                            <option value="Urban">{t('urban')}</option>
                            <option value="Rural">{t('rural')}</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ margin: 0, gridColumn: '1 / -1' }}>
                        <label className="form-label">{t('incomeLabel')}</label>
                        <select name="income" className="form-input" value={formData.income} onChange={handleChange} required>
                            <option value="">{t('selectIncome')}</option>
                            <option value="0-1 Lakh">0 - 1 Lakh</option>
                            <option value="1-2.5 Lakh">1 - 2.5 Lakhs</option>
                            <option value="2.5-5 Lakh">2.5 - 5 Lakhs</option>
                            <option value="5-8 Lakh">5 - 8 Lakhs</option>
                            <option value="8+ Lakh">Above 8 Lakhs</option>
                        </select>
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                            {t('saveAndSearch')}
                        </button>
                    </div>
                </form>
                <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @media (max-width: 600px) {
                    form { grid-template-columns: 1fr !important; }
                }
            `}</style>
            </div>
        </div>
    );
};
