import { useState } from 'react';
import { Navbar } from './Navbar';
import { Login } from './Login';
import { Signup } from './Signup';
import { Profile } from './Profile';
import { LanguageProvider } from './LanguageContext';
import { Dashboard } from './components/Dashboard';
import { PrivacyPolicy, TermsOfUse, HelpDesk } from './components/InfoPages';
import { useLanguage } from './LanguageContext';

function AppContent() {
  const { t } = useLanguage();

  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard' | 'profile' | 'privacy' | 'terms' | 'help'>('login');
  const [previousView, setPreviousView] = useState<'login' | 'signup' | 'dashboard' | 'profile' | 'privacy' | 'terms' | 'help'>('login');
  const [user, setUser] = useState<{
    name: string;
    id?: string;
    state?: string;
    gender?: string;
    age?: string;
    caste?: string;
    residence?: string;
    income?: string;
    district?: string;
  } | null>(null);

  const handleNavigate = (view: 'login' | 'signup' | 'dashboard' | 'profile' | 'privacy' | 'terms' | 'help') => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const handleLogin = (name: string) => {
    setUser({ name });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleUpdateUser = (data: any) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const renderView = () => {
    if (!user && currentView !== 'signup') {
      return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'login':
        return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'signup':
        return <Signup onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile user={user} onUpdateUser={handleUpdateUser} onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onUpdateUser={handleUpdateUser} user={user} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentView(previousView)} />;
      case 'terms':
        return <TermsOfUse onBack={() => setCurrentView(previousView)} />;
      case 'help':
        return <HelpDesk onBack={() => setCurrentView(previousView)} />;
      default:
        return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app">
      <Navbar onNavigate={handleNavigate} isLoggedIn={!!user} onLogout={handleLogout} />
      <main>
        {renderView()}
      </main>
      <footer className="footer" style={{ padding: '3rem 1rem' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>&copy; 2026 Government of India. All rights reserved.</p>
        <p style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => handleNavigate('privacy')} className="btn-link" style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}>{t('privacyPolicy')}</button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button onClick={() => handleNavigate('terms')} className="btn-link" style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}>{t('termsOfUse')}</button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button onClick={() => handleNavigate('help')} className="btn-link" style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}>{t('helpDesk')}</button>
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
