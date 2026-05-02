import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatWithAI, addMessage, fetchInteractions } from '../store';
import { FaPaperPlane } from 'react-icons/fa';

const ChatUI = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { chatMessages, loading } = useSelector(state => state.crm);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    dispatch(addMessage({ role: 'user', content: userMsg }));
    
    await dispatch(chatWithAI(userMsg));
    // After chat, refresh dashboard in case a tool logged something
    dispatch(fetchInteractions());
  };

  return (
    <div className="card chat-window">
      <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>AI Assistant</h3>
      <p style={{color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem'}}>
        Log interaction via chat
      </p>
      
      <div className="chat-messages" ref={scrollRef} style={{flex: 1, overflowY: 'auto', padding: '0.5rem', fontSize: '0.9rem'}}>
        {chatMessages.length === 0 && (
          <div className="message ai" style={{padding: '0.75rem'}}>
            Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy") or ask for help.
          </div>
        )}
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message ai">Thinking...</div>}
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={loading}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
