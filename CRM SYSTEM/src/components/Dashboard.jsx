import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInteractions, deleteInteraction } from '../store';
import { FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { interactions } = useSelector(state => state.crm);

  useEffect(() => {
    dispatch(fetchInteractions());
  }, [dispatch]);

  return (
    <div style={{animation: 'fadeIn 0.5s ease-out'}}>
      <div className="page-header">
        <h1 className="page-title">Interaction History</h1>
        <p className="page-subtitle">Manage and track your recent HCP meetings</p>
      </div>

      {interactions.length === 0 ? (
        <div className="card" style={{textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', background: 'transparent'}}>
          <p style={{color: 'var(--text-muted)', fontSize: '1.5rem', marginBottom: '1rem'}}>No interactions logged yet.</p>
          <p style={{color: 'var(--text-muted)'}}>Start by adding one via the Form or Chat interface!</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Product</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interactions.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{fontWeight: 600}}>{item.doctor_name}</div>
                    <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{item.notes?.substring(0, 30)}...</div>
                  </td>
                  <td>{item.interaction_date}</td>
                  <td><span className="status-pill">{item.product_discussed}</span></td>
                  <td>{item.follow_up}</td>
                  <td>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                      <button 
                        onClick={() => dispatch(deleteInteraction(item.id))}
                        style={{background: 'var(--danger)', padding: '0.5rem'}}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
