import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportView = () => {
  const [report, setReport] = useState(null);

  const fetchReport = () => {
    axios.get('http://localhost:8000/api/reports/summary')
      .then(res => setReport(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (!report) return <div>Loading reports...</div>;

  return (
    <div style={{animation: 'fadeIn 0.5s ease-out'}}>
      <div className="page-header">
        <h1 className="page-title">Performance Summary</h1>
        <p className="page-subtitle">Visual analytics and rep activity metrics</p>
      </div>
      
      <div className="stats-grid" style={{marginBottom: '3rem'}}>
        <div className="card stat-card" style={{background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)'}}>
          <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Total Interactions</div>
          <div className="stat-value" style={{color: '#818cf8'}}>{report.total}</div>
        </div>
        <div className="card stat-card" style={{background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34, 211, 238, 0.2)'}}>
          <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Doctors Reached</div>
          <div className="stat-value" style={{color: '#22d3ee'}}>{report.byDoctor.length}</div>
        </div>
        <div className="card stat-card" style={{background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)'}}>
          <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Products Discussed</div>
          <div className="stat-value" style={{color: '#10b981'}}>{report.byProduct.length}</div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginTop: '2rem'}}>
        <div className="card" style={{background: 'rgba(255,255,255,0.02)'}}>
          <h3 style={{borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem'}}>Activity by Product</h3>
          {report.byProduct.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No data yet.</p> : report.byProduct.map(p => (
            <div key={p.product_discussed} style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)'}}>
              <span>{p.product_discussed || 'Not specified'}</span>
              <span style={{fontWeight: 700, color: 'var(--accent)'}}>{p.count}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{background: 'rgba(255,255,255,0.02)'}}>
          <h3 style={{borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem'}}>Doctor Engagement</h3>
          {report.byDoctor.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No data yet.</p> : report.byDoctor.map(d => (
            <div key={d.doctor_name} style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)'}}>
              <span>{d.doctor_name}</span>
              <span style={{fontWeight: 700, color: 'var(--success)'}}>{d.count} interactions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportView;
