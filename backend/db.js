import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'crm.db'));

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_name TEXT NOT NULL,
    interaction_date TEXT NOT NULL,
    interaction_time TEXT,
    interaction_type TEXT,
    attendees TEXT,
    notes TEXT,
    sentiment TEXT,
    outcomes TEXT,
    product_discussed TEXT,
    follow_up TEXT,
    summary TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
