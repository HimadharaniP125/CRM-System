# Healthcare CRM System (Node.js + React + LangGraph)

A mini CRM for healthcare reps to log doctor interactions via Form or AI Chat.

## Features
- **Form UI**: Structured logging of HCP interactions.
- **Chat UI**: Natural language logging using **LangGraph AI Agent**.
- **AI Agent Tools**: 
  - `log_interaction`: Auto-parses entities from chat.
  - `edit_interaction`: Modifies records.
  - `get_interaction_history`: Fetches past data.
  - `suggest_next_action`: AI follow-up tips.
  - `generate_summary_report`: Activity analytics.
- **Dashboard**: Full history view with delete functionality.
- **Reports**: Visual analytics of interactions.

## Tech Stack
- **Frontend**: React, Redux Toolkit, React Router, Vite.
- **Backend**: Node.js, Express, Better-SQLite3.
- **AI**: LangGraph.js, LangChain, Groq (Llama3-70b).

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in `backend/`.
2. Install dependencies: `npm install`
3. Create a `.env` file (template provided) and add your `GROQ_API_KEY`.
4. Run the server: `node server.js`

### 2. Frontend Setup
1. Open a terminal in `CRM SYSTEM/`.
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`

### 3. Usage
- Go to `http://localhost:5173` (or the URL Vite provides).
- Use **Form UI** for manual entry.
- Use **AI Chat** to type things like: *"Met Dr. Smith, discussed Cardio-X, follow up next Tuesday"*
- Check the **Dashboard** to see the results.
