import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

// Async Thunks
export const fetchInteractions = createAsyncThunk('crm/fetchInteractions', async () => {
  const response = await axios.get(`${API_BASE}/interactions`);
  return response.data;
});

export const logInteraction = createAsyncThunk('crm/logInteraction', async (data) => {
  const response = await axios.post(`${API_BASE}/interactions`, data);
  return response.data;
});

export const chatWithAI = createAsyncThunk('crm/chatWithAI', async (message) => {
  const response = await axios.post(`${API_BASE}/chat`, { message });
  return response.data;
});

export const deleteInteraction = createAsyncThunk('crm/deleteInteraction', async (id) => {
  await axios.delete(`${API_BASE}/interactions/${id}`);
  return id;
});

const crmSlice = createSlice({
  name: 'crm',
  initialState: {
    interactions: [],
    chatMessages: [],
    loading: false,
    error: null
  },
  reducers: {
    addMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.interactions = action.payload;
      })
      .addCase(logInteraction.fulfilled, (state, action) => {
        // Optimistic refresh or wait for next fetch
      })
      .addCase(chatWithAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.chatMessages.push({ role: 'ai', content: action.payload.reply });
      })
      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.interactions = state.interactions.filter(i => i.id !== action.payload);
      });
  }
});

export const { addMessage } = crmSlice.actions;

export const store = configureStore({
  reducer: {
    crm: crmSlice.reducer
  }
});
