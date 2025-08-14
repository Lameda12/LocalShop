# 🚀 Railway Deployment Guide - LocalShop

## ✅ Fixed Issues

Your Railway deployment was failing because of the `cd` command issue. This has been **FIXED** with:

- ✅ **Proper start script** (`start.sh`)
- ✅ **Procfile** for Railway compatibility
- ✅ **Nixpacks configuration** 
- ✅ **Updated package.json** scripts
- ✅ **All code pushed to GitHub**

---

## 🚀 Deploy to Railway (Step-by-Step)

### Step 1: Login to Railway
1. Go to [**railway.app**](https://railway.app)
2. **Login** with your GitHub account

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **"Lameda12/LocalShop"** repository
4. Click **"Deploy"**

### Step 3: Add Database
1. In your Railway project dashboard
2. Click **"New"** → **"Database"** → **"Add MongoDB"**
3. Railway will create a MongoDB instance
4. **Copy the connection string** (MongoDB URI)

### Step 4: Set Environment Variables
1. Go to your **LocalShop service** (not the database)
2. Click **"Variables"** tab
3. Add these variables:

```bash
NODE_ENV=production
MONGODB_URI=mongodb://mongo:27017/localshop
```

**Note**: Railway will provide the exact MongoDB URI - use that instead of the example above.

### Step 5: Redeploy
1. Railway should **automatically redeploy** after setting variables
2. If not, click **"Deploy"** → **"Redeploy"**

### Step 6: Get Your URL
1. In Railway dashboard, click **"Settings"**
2. Scroll to **"Domains"**
3. Your app will be available at: `https://your-app-name.railway.app`

---

## 🔧 Alternative Deployment Methods

### Method 1: Use Procfile
Railway will automatically detect and use the `Procfile`:
```
web: node server/src/index.js
```

### Method 2: Use nixpacks.toml
The `nixpacks.toml` file provides explicit build instructions:
```toml
[start]
cmd = "node server/src/index.js"
```

### Method 3: Use start.sh script
The executable `start.sh` script handles the startup:
```bash
#!/bin/bash
export NODE_ENV=production
exec node server/src/index.js
```

---

## 🐛 Troubleshooting

### If Deployment Still Fails:

1. **Check Build Logs**:
   - Railway Dashboard → Your Project → "Deployments" → Click latest deployment
   - Look for error messages in build logs

2. **Common Issues**:
   ```bash
   # If you see "cd command not found"
   → This is now FIXED in our updated code
   
   # If you see "Cannot find module"
   → Check that all dependencies are in server/package.json
   
   # If you see "Port already in use"
   → Railway handles ports automatically, ignore local port issues
   
   # If you see "MongoDB connection failed"
   → Check that MONGODB_URI is set correctly in Railway variables
   ```

3. **Force Redeploy**:
   - Railway Dashboard → "Deployments" → "Redeploy"

4. **Check Environment Variables**:
   - Railway Dashboard → "Variables" → Verify `NODE_ENV` and `MONGODB_URI`

---

## 🧪 Test Your Deployment

Once deployed, test these URLs:

1. **Health Check**: `https://your-app-name.railway.app/health`
   - Should return: `{"ok":true}`

2. **API Test**: `https://your-app-name.railway.app/api/listings`
   - Should return listings (may be empty initially)

3. **Frontend**: `https://your-app-name.railway.app`
   - Should show your LocalShop marketplace

---

## 🎉 Success! Share with Mom

Once deployed successfully:

1. **Share the URL**: `https://your-app-name.railway.app`
2. **Help her install as PWA**: Browser will suggest "Add to Home Screen"
3. **Create first listing**: Use the guide in `USER-GUIDE.md`
4. **Share with friends**: Watch the compound growth begin!

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit per month (perfect for starting)
- **Scales automatically**: Pay only for what you use
- **No sleeping**: Unlike Heroku, your app stays awake
- **Custom domains**: Available on all plans

---

## 🔄 Future Updates

To update your deployment:
```bash
git add .
git commit -m "Update LocalShop"
git push
```

Railway will **automatically redeploy** when you push to GitHub! 🚀

---

## 📞 Need Help?

If you still have issues:
1. Check Railway documentation: [docs.railway.app](https://docs.railway.app)
2. Railway Discord community for support
3. Or let me know what specific error you're seeing!

**Your LocalShop is ready to conquer the marketplace world!** 🌟
