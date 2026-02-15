import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

interface Scheme {
  name: string;
  description: string;
  eligibility: string;
  documents?: string[];
  apply_link: string;
}

interface Message {
  id: string;
  role: 'citizen' | 'assistant';
  content: string;
  schemes?: Scheme[];
}

interface SchemeChatProps {
  onBack: () => void;
}

export const SchemeChat: React.FC<SchemeChatProps> = ({ onBack }) => {
  const { t, language } = useLanguage();

  const languageMap: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    gu: 'Gujarati',
    pa: 'Punjabi',
    ta: 'Tamil',
    te: 'Telugu',
    ml: 'Malayalam'
  };

  const selectedLanguage = languageMap[language] || 'English';

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Namaste! Please describe your life situation so I can find the right government schemes for you.'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // ===============================
  // SEND MESSAGE
  // ===============================
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'citizen',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/schemes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: input,
          language: selectedLanguage
        })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data?.message ||
          'Based on your situation, here are the schemes that may help you:',
        schemes: Array.isArray(data?.schemes) ? data.schemes : []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: 'error',
          role: 'assistant',
          content:
            'Sorry, I am unable to connect to the server right now. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div
      className="card"
      style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: '1rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'var(--surface)'
        }}
      >
        <button onClick={onBack} className="btn-back" style={{ margin: '1rem 2rem 0' }}>
          <span className="btn-back-icon">←</span> {t('back')}
        </button>
        <h3 style={{ margin: 0, color: 'var(--primary)' }}>
          Find Government Schemes
        </h3>
      </div>

      {/* CHAT AREA */}
      <div
        className="animate-fade-in"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          background: 'rgba(248, 250, 252, 0.5)'
        }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              alignSelf:
                msg.role === 'citizen' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: msg.role === 'citizen' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                background:
                  msg.role === 'citizen'
                    ? 'var(--gradient-primary)'
                    : 'white',
                color:
                  msg.role === 'citizen'
                    ? 'white'
                    : 'var(--text-main)',
                boxShadow: msg.role === 'citizen' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                fontSize: '1.05rem',
                border: msg.role === 'citizen' ? 'none' : '1px solid var(--border)'
              }}
            >
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </div>

              {/* SCHEMES */}
              {msg.schemes && msg.schemes.length > 0 && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  {msg.schemes.map((scheme, idx) => (
                    <div
                      key={idx}
                      className="card"
                      style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        borderLeft: '6px solid var(--primary-light)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <h4
                        style={{
                          color: 'var(--primary)',
                          margin: 0,
                          fontSize: '1.25rem'
                        }}
                      >
                        {scheme.name}
                      </h4>

                      <div style={{ fontSize: '1rem', margin: '0.75rem 0', color: 'var(--text-muted)' }}>
                        {scheme.description}
                      </div>

                      <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', background: 'white', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <b>Eligibility:</b> {scheme.eligibility}
                      </div>

                      {/* ✅ DOCUMENTS LIST */}
                      {Array.isArray(scheme.documents) &&
                        scheme.documents.length > 0 && (
                          <div
                            style={{
                              fontSize: '0.9rem',
                              marginTop: '1rem',
                              color: 'var(--text-muted)'
                            }}
                          >
                            <b style={{ color: 'var(--text-main)' }}>Required Documents:</b>
                            <div
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                marginTop: '0.5rem'
                              }}
                            >
                              {scheme.documents.map((doc, i) => (
                                <span key={i} style={{
                                  background: '#fff',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '4px',
                                  border: '1px solid var(--border)',
                                  fontSize: '0.8rem'
                                }}>{doc}</span>
                              ))}
                            </div>
                          </div>
                        )}

                      <a
                        href={scheme.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{
                          marginTop: '1.5rem',
                          width: '100%',
                          padding: '0.75rem'
                        }}
                      >
                        Apply Now ➜
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '1rem',
              background: 'white',
              borderRadius: '12px',
              color: '#666'
            }}
          >
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div
        style={{
          padding: '1rem',
          borderTop: '1px solid var(--border)',
          background: 'white'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Describe your situation..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            className="btn btn-primary"
            style={{ width: 'auto' }}
            onClick={handleSend}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
