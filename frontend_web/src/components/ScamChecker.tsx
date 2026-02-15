import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export const ScamChecker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();

  const [text, setText] = useState('');
  const [result, setResult] = useState<{
    classification: string;
    reason: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/check-scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Scam check failed');
      }

      setResult({
        classification: data.isScam ? 'Fake' : 'Genuine',
        reason: data.reason,
      });
    } catch (error) {
      console.error(error);
      alert('Error checking message');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'fake':
        return '#ef4444'; // Red
      case 'suspicious':
        return '#f59e0b'; // Amber
      case 'genuine':
        return '#22c55e'; // Green
      default:
        return '#64748b';
    }
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
      <button onClick={onBack} className="btn-back">
        <span className="btn-back-icon">←</span> {t('back')}
      </button>

      <div className="card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>🛡️</div>
          <h1 className="mb-2" style={{ fontSize: '2.5rem' }}>
            {t('scamCheckerTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {t('scamCheckerInstructions')}
          </p>
        </div>

        <div className="form-group">
          <textarea
            className="form-input"
            rows={6}
            placeholder={t('scamCheckerPlaceholder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              resize: 'none',
              minHeight: '180px',
              fontSize: '1.1rem',
              borderWidth: '2px'
            }}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleCheck}
          disabled={loading}
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}
        >
          {loading ? 'Analyzing with AI...' : t('analyzeBtn')}
        </button>

        {result && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '3rem',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${getStatusColor(result.classification)}`,
              background: `white`,
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '8px',
              background: getStatusColor(result.classification)
            }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  background: getStatusColor(result.classification),
                  color: 'white',
                  padding: '0.4rem 1.25rem',
                  borderRadius: '99px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                }}
              >
                {result.classification}
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>AI Detection Result</span>
            </div>

            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', fontWeight: 500 }}>
              {result.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
