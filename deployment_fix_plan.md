# Deployment Fix Plan

The error `react-scripts build` (exit code 127) occurs because your project uses **Vite**, but the deployment platform is defaulting to **Create React App** settings. Additionally, since your frontend is in a subfolder (`CRM SYSTEM`), the platform can't find the build scripts in the root.

## Proposed Changes

### 1. Root Configuration
Create a `package.json` in the root directory to bridge the deployment commands to the subfolder.

### 2. Vercel Configuration
Create a `vercel.json` in the root to specify the correct build command and output directory.

### 3. Verification
- Verify that `npm run build` works in the subfolder (already tested).
- Ensure all environment variables are ready for deployment.

## Steps

1. **Create Root `package.json`**:
   - Define `build` script: `cd "CRM SYSTEM" && npm install && npm run build`
   - Define `install` script: `cd \"CRM SYSTEM\" && npm install`

2. **Create `vercel.json`**:
   - Set `rootDirectory`: `CRM SYSTEM`
   - Or configure the build pipeline.

3. **User Instructions**:
   - Guide the user on how to set the "Root Directory" in Vercel/Netlify if the file configuration isn't enough.
