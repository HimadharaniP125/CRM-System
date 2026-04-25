import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FormUI from './components/FormUI';
import ChatUI from './components/ChatUI';
import InteractionPage from './components/InteractionPage';
import ReportView from './components/ReportView';
import { FaBars, FaTimes, FaUserMd } from 'react-icons/fa';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-container">
      <header className="mobile-header">
        <div className="logo" style={{ marginBottom: 0 }}>
          <FaUserMd />
          <span>CareCRM</span>
        </div>
        <button className="menu-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<InteractionPage />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/reports" element={<ReportView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
