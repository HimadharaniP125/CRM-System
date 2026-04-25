import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FormUI from './components/FormUI';
import ChatUI from './components/ChatUI';
import InteractionPage from './components/InteractionPage';
import ReportView from './components/ReportView';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
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
