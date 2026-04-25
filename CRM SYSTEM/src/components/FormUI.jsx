import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInteraction, fetchInteractions } from '../store';
import { useNavigate } from 'react-router-dom';

const FormUI = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor_name: '',
    interaction_date: new Date().toISOString().split('T')[0],
    interaction_time: '19:30',
    interaction_type: 'Meeting',
    attendees: '',
    notes: '', // Topics Discussed
    sentiment: 'Neutral',
    outcomes: '',
    follow_up: '', // Next steps
    product_discussed: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logInteraction(formData));
    dispatch(fetchInteractions());
    navigate('/');
  };

  return (
    <div className="card">
      <h3 style={{marginBottom: '1.5rem', opacity: 0.8}}>Interaction Details</h3>
      <form onSubmit={handleSubmit}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
          <div className="form-group">
            <label>HCP Name</label>
            <input 
              type="text" 
              required 
              value={formData.doctor_name}
              onChange={(e) => setFormData({...formData, doctor_name: e.target.value})}
              placeholder="Search or select HCP..."
            />
          </div>
          <div className="form-group">
            <label>Interaction Type</label>
            <select 
              value={formData.interaction_type}
              onChange={(e) => setFormData({...formData, interaction_type: e.target.value})}
            >
              <option>Meeting</option>
              <option>Call</option>
              <option>Email</option>
              <option>Conference</option>
            </select>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              required 
              value={formData.interaction_date}
              onChange={(e) => setFormData({...formData, interaction_date: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input 
              type="time" 
              value={formData.interaction_time}
              onChange={(e) => setFormData({...formData, interaction_time: e.target.value})}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Attendees</label>
          <input 
            type="text" 
            value={formData.attendees}
            onChange={(e) => setFormData({...formData, attendees: e.target.value})}
            placeholder="Enter names or search..."
          />
        </div>

        <div className="form-group">
          <label>Topics Discussed (Product, Efficacy, etc.)</label>
          <textarea 
            rows="3"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Enter key discussion points..."
          />
        </div>

        <div className="form-group">
          <label>Observed/Inferred HCP Sentiment</label>
          <div style={{display: 'flex', gap: '2rem', padding: '0.5rem 0'}}>
            {['Positive', 'Neutral', 'Negative'].map(s => (
              <label key={s} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)'}}>
                <input 
                  type="radio" 
                  name="sentiment" 
                  style={{width: 'auto'}}
                  checked={formData.sentiment === s}
                  onChange={() => setFormData({...formData, sentiment: s})}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Outcomes</label>
          <textarea 
            rows="2"
            value={formData.outcomes}
            onChange={(e) => setFormData({...formData, outcomes: e.target.value})}
            placeholder="Key outcomes or agreements..."
          />
        </div>

        <div className="form-group">
          <label>Follow-up Actions (Next Steps)</label>
          <textarea 
            rows="2"
            value={formData.follow_up}
            onChange={(e) => setFormData({...formData, follow_up: e.target.value})}
            placeholder="Enter next steps or tasks..."
          />
        </div>

        <button type="submit" style={{width: '100%', marginTop: '1rem'}}>
          Complete Logging
        </button>
      </form>
    </div>
  );
};

export default FormUI;
