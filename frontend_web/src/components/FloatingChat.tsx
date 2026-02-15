import React from 'react';
interface FloatingChatProps {
    onClick: () => void;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                color: 'white',
                boxShadow: '0 8px 16px rgba(30, 58, 138, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                border: 'none',
                cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
            aria-label="Open Chat Support"
        >
            <span style={{ fontSize: '2rem' }}>🤖</span>
        </button>
    );
};
