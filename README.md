# 🌿 Nature Villa AI Concierge

AI-powered guest concierge for Nature Villa, Olaulim, Goa.  
Built with Node.js + Claude (Anthropic API).

---

## Deploy to Railway (free, 5 minutes)

### Step 1 — Push to GitHub
1. Go to [github.com](https://github.com) → sign in or create free account
2. Click **New repository** → name it `villa-concierge` → **Create**
3. On the next screen, click **uploading an existing file**
4. Drag and drop all 4 files from this folder: `server.js`, `index.html`, `package.json`, `README.md`
5. Click **Commit changes**

### Step 2 — Deploy on Railway
1. Go to [railway.app](https://railway.app) → **Start a New Project**
2. Choose **Deploy from GitHub repo** → select `villa-concierge`
3. Railway auto-detects Node.js and deploys it

### Step 3 — Add your API key
1. In Railway, click your project → **Variables** tab
2. Click **New Variable** and add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-your-key-here`
3. Click **Add** — Railway redeploys automatically

### Step 4 — Get your public URL
1. Click **Settings** tab → **Domains** → **Generate Domain**
2. You'll get a URL like: `villa-concierge-production.up.railway.app`
3. Share this link with guests! 🎉

---

## Run locally
```
node server.js
# requires ANTHROPIC_API_KEY environment variable to be set
```

Or with the key inline (Mac/Linux):
```
ANTHROPIC_API_KEY=sk-ant-... node server.js
```

---

## Customise
Edit `index.html` → find the `SYS` variable near the bottom of the file.  
Update WiFi password, smartlock code, house rules, local recommendations, etc.
