import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchInteractions
      .addCase(fetchInteractions.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.interactions = action.payload;
      })
      .addCase(fetchInteractions.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // logInteraction
      .addCase(logInteraction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInteraction.fulfilled, (state, action) => {
        state.loading = false;
        // Push the newly saved interaction directly so Dashboard updates instantly
        if (action.payload && action.payload.id) {
          state.interactions.unshift(action.payload);
        }
      })
      .addCase(logInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // chatWithAI
      .addCase(chatWithAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.chatMessages.push({ role: 'ai', content: action.payload.reply });
      })
      .addCase(chatWithAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // deleteInteraction
      .addCase(deleteInteraction.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.interactions = state.interactions.filter(i => i.id !== action.payload);
      })
      .addCase(deleteInteraction.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { addMessage, clearError } = crmSlice.actions;

export const store = configureStore({
  reducer: {
    crm: crmSlice.reducer
  }
});
