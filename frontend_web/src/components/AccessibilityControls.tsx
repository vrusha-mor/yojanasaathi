import React, { useState } from 'react';

export const AccessibilityControls: React.FC = () => {
    const [fontSize, setFontSize] = useState(100);

    const setSize = (size: number) => {
        setFontSize(size);
        document.documentElement.style.fontSize = `${size}%`; // 100% = 16px usually
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '2px',
            height: '32px'
        }}>
            <button
                onClick={() => setSize(110)}
                title="Increase Font Size"
                style={{
                    padding: '0 8px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    background: fontSize > 100 ? '#e2e8f0' : 'transparent',
                    borderRadius: '4px'
                }}
            >
                A+
            </button>
            <button
                onClick={() => setSize(100)}
                title="Reset Font Size"
                style={{
                    padding: '0 8px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    background: fontSize === 100 ? '#e2e8f0' : 'transparent',
                    borderRadius: '4px'
                }}
            >
                A
            </button>
            <button
                onClick={() => setSize(90)}
                title="Decrease Font Size"
                style={{
                    padding: '0 8px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    background: fontSize < 100 ? '#e2e8f0' : 'transparent',
                    borderRadius: '4px'
                }}
            >
                A-
            </button>
            <div style={{
                width: '32px',
                height: '26px',
                background: '#000',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                borderRadius: '4px',
                marginLeft: '4px',
                cursor: 'pointer'
            }} title="High Contrast (Demo Only)">
                A
            </div>
            <div style={{
                width: '32px',
                height: '26px',
                background: '#fff',
                color: '#000',
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                borderRadius: '4px',
                cursor: 'pointer'
            }} title="Normal Contrast">
                A
            </div>
        </div>
    );
};
