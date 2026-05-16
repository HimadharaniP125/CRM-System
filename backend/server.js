import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import { agent } from './agent.js';
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Log Interaction (Manual Form)
app.post('/api/interactions', (req, res) => {
  const { doctor_name, interaction_date, interaction_time, interaction_type, attendees, notes, sentiment, outcomes, product_discussed, follow_up } = req.body;
  try {
    const stmt = db.prepare(`
      INSERT INTO interactions (doctor_name, interaction_date, interaction_time, interaction_type, attendees, notes, sentiment, outcomes, product_discussed, follow_up)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(doctor_name, interaction_date, interaction_time, interaction_type, attendees, notes, sentiment, outcomes, product_discussed, follow_up);
    // Return the full saved row so the frontend can add it to state immediately
    const newRow = db.prepare('SELECT * FROM interactions WHERE id = ?').get(info.lastInsertRowid);
    res.json(newRow);
  } catch (err) {
    console.error("POST /api/interactions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Interactions
app.get('/api/interactions', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM interactions ORDER BY interaction_date DESC").all();
    res.json(rows);
  } catch (err) {
    console.error("GET /api/interactions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Edit Interaction
app.put('/api/interactions/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const fields = Object.keys(updates).map(k => `${k} = ?`).join(", ");
    const values = Object.values(updates);
    db.prepare(`UPDATE interactions SET ${fields} WHERE id = ?`).run(...values, id);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("PUT /api/interactions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete Interaction
app.delete('/api/interactions/:id', (req, res) => {
  try {
    db.prepare("DELETE FROM interactions WHERE id = ?").run(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/interactions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 5. Chat UI (LangGraph Agent)
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes('your_groq_api_key')) {
    return res.status(400).json({ 
      reply: "Error: Groq API Key is missing. Please add it to the backend/.env file to use the AI Chat feature.",
      error: "Missing API Key"
    });
  }

  try {
    const response = await agent.invoke({
      messages: [new HumanMessage(message)],
    });
    const lastMessage = response.messages[response.messages.length - 1];
    res.json({ 
      reply: lastMessage.content,
      history: response.messages 
    });
  } catch (err) {
    console.error("Agent Error:", err);
    res.status(500).json({ 
      reply: "I encountered an error processing your request. Please check the server logs.",
      error: err.message 
    });
  }
});

// 6. Summary Report
app.get('/api/reports/summary', (req, res) => {
  try {
    const total = db.prepare("SELECT COUNT(*) as count FROM interactions").get().count;
    const byProduct = db.prepare("SELECT product_discussed, COUNT(*) as count FROM interactions GROUP BY product_discussed").all();
    const byDoctor = db.prepare("SELECT doctor_name, COUNT(*) as count FROM interactions GROUP BY doctor_name").all();
    res.json({ total, byProduct, byDoctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
