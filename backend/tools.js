import { tool } from "@langchain/core/tools";
import { z } from "zod";
import db from "./db.js";

export const logInteractionTool = tool(
  async ({ doctor_name, interaction_date, notes, product_discussed, follow_up }) => {
    const stmt = db.prepare(`
      INSERT INTO interactions (doctor_name, interaction_date, notes, product_discussed, follow_up)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(doctor_name, interaction_date, notes, product_discussed, follow_up);
    return `Successfully logged interaction with ID ${info.lastInsertRowid}`;
  },
  {
    name: "log_interaction",
    description: "Logs a new interaction with a doctor.",
    schema: z.object({
      doctor_name: z.string().describe("The name of the doctor (HCP)"),
      interaction_date: z.string().describe("The date of the interaction (YYYY-MM-DD)"),
      notes: z.string().describe("Discussion notes"),
      product_discussed: z.string().describe("The product discussed"),
      follow_up: z.string().describe("Follow-up details or date"),
    }),
  }
);

export const editInteractionTool = tool(
  async ({ id, ...updates }) => {
    const fields = Object.keys(updates).map(k => `${k} = ?`).join(", ");
    const values = Object.values(updates);
    const stmt = db.prepare(`UPDATE interactions SET ${fields} WHERE id = ?`);
    stmt.run(...values, id);
    return `Successfully updated interaction ${id}`;
  },
  {
    name: "edit_interaction",
    description: "Edits an existing interaction record.",
    schema: z.object({
      id: z.number().describe("The ID of the interaction to edit"),
      doctor_name: z.string().optional(),
      interaction_date: z.string().optional(),
      notes: z.string().optional(),
      product_discussed: z.string().optional(),
      follow_up: z.string().optional(),
    }),
  }
);

export const getHistoryTool = tool(
  async ({ doctor_name }) => {
    let query = "SELECT * FROM interactions";
    let params = [];
    if (doctor_name) {
      query += " WHERE doctor_name LIKE ?";
      params.push(`%${doctor_name}%`);
    }
    query += " ORDER BY interaction_date DESC LIMIT 10";
    const rows = db.prepare(query).all(...params);
    return JSON.stringify(rows);
  },
  {
    name: "get_interaction_history",
    description: "Retrieves past interactions, optionally filtered by doctor name.",
    schema: z.object({
      doctor_name: z.string().optional().describe("Filter by doctor name"),
    }),
  }
);

export const suggestNextActionTool = tool(
  async ({ doctor_name }) => {
    const rows = db.prepare("SELECT * FROM interactions WHERE doctor_name LIKE ? ORDER BY interaction_date DESC LIMIT 1")
      .all(`%${doctor_name}%`);
    if (rows.length === 0) return "No history found for this doctor to suggest actions.";
    const last = rows[0];
    return `Based on last meeting on ${last.interaction_date} regarding ${last.product_discussed}, suggest a follow-up about ${last.follow_up} in 7 days.`;
  },
  {
    name: "suggest_next_action",
    description: "Suggests the next best action for a specific doctor based on history.",
    schema: z.object({
      doctor_name: z.string().describe("The name of the doctor"),
    }),
  }
);

export const generateSummaryReportTool = tool(
  async () => {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        COUNT(DISTINCT doctor_name) as unique_doctors,
        interaction_date
      FROM interactions 
      GROUP BY interaction_date
      ORDER BY interaction_date DESC
    `).all();
    return JSON.stringify(stats);
  },
  {
    name: "generate_summary_report",
    description: "Generates a summary report of recent interactions and activity.",
    schema: z.object({}),
  }
);

export const tools = [
  logInteractionTool,
  editInteractionTool,
  getHistoryTool,
  suggestNextActionTool,
  generateSummaryReportTool
];
