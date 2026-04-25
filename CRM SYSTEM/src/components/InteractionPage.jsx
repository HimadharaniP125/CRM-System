import React from 'react';
import FormUI from './FormUI';
import ChatUI from './ChatUI';

const InteractionPage = () => {
  return (
    <div style={{animation: 'fadeIn 0.5s ease-out'}}>
      <div className="page-header">
        <h1 className="page-title">Log HCP Interaction</h1>
        <p className="page-subtitle">Unified logging with AI assistance</p>
      </div>

      <div style={{
        display: 'grid', 
        gridTemplateColumns: '1.5fr 1fr', 
        gap: '2rem', 
        alignItems: 'start'
      }}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          <FormUI />
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', position: 'sticky', top: '2rem'}}>
          <ChatUI />
          
          <div className="card" style={{background: 'rgba(99, 102, 241, 0.05)'}}>
            <h3 style={{fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)'}}>
              AI Suggested Follow-ups
            </h3>
            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-muted)'}}>
              <li style={{marginBottom: '0.75rem', paddingLeft: '1.25rem', position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--primary)'}}>+</span>
                Schedule follow-up meeting in 2 weeks
              </li>
              <li style={{marginBottom: '0.75rem', paddingLeft: '1.25rem', position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--primary)'}}>+</span>
                Send Product Clinical PDF
              </li>
              <li style={{paddingLeft: '1.25rem', position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--primary)'}}>+</span>
                Add to monthly advisory board list
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionPage;
