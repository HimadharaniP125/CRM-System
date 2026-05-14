# Step-by-Step Deployment Guide

Follow these steps to deploy your CRM System properly. Since you have a Frontend and a Backend, they usually need to be deployed separately (or as a monorepo).

## 1. Prepare for Deployment
I have already added the following files to your project:
- **`package.json` (Root)**: Automatically routes commands to the right folder.
- **`vercel.json` (Root)**: Configures the frontend build for Vercel.

---

## 2. Deploying the Frontend (Vercel)

Vercel is best for your `CRM SYSTEM` folder.

1. **Push your code to GitHub.**
2. **In Vercel Dashboard**:
   - Click **"Add New"** > **"Project"**.
   - Import your repository.
   - **Framework Preset**: Select `Vite`.
   - **Root Directory**: Select `CRM SYSTEM` (or leave as root if using my `vercel.json`).
   - **Environment Variables**: Add `VITE_API_URL` (this should be your deployed Backend URL, e.g., `https://crm-backend.onrender.com/api`).
3. **Deploy**.

---

## 3. Deploying the Backend (Render or Railway)

Since your backend uses **Node.js** and **SQLite**, it needs a persistent server (not Vercel). **Render.com** or **Railway.app** are great free/cheap options.

1. **Create an account on [Render.com](https://render.com)**.
2. **Create a "Web Service"**.
3. **Connect your GitHub Repository**.
4. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables**:
   - Add `GROQ_API_KEY`: (Your actual Groq key).
   - Add `PORT`: `8000` (or leave default).
6. **Deploy**.

> [!CAUTION]
> **SQLite Note**: On Render/Railway, your database will reset every time the server restarts unless you add a "Disk" (Persistent Storage). For a simple demo, it will work, but data won't persist forever.

---

## 4. Connecting Frontend to Backend

1. Once your Backend is deployed, copy its URL (e.g., `https://my-crm-api.onrender.com`).
2. Go back to your **Vercel Frontend Settings**.
3. Update `VITE_API_URL` to: `https://my-crm-api.onrender.com/api`.
4. Redeploy the frontend.

---

## 5. Troubleshooting Checklist

- [ ] **Build Fails?** Check that you are running `npm run build` inside `CRM SYSTEM`.
- [ ] **API Errors?** Ensure `VITE_API_URL` includes the `/api` suffix.
- [ ] **AI Chat not working?** Ensure your `GROQ_API_KEY` is added to the **Backend** environment variables.
