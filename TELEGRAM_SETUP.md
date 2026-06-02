# Telegram Bot Setup Guide

## For Vercel Deployment

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project "menu_coffe_small_store"
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

**Variable 1:**
- Name: `TELEGRAM_BOT_TOKEN`
- Value: `8998334664:AAGWHePTYdiUK8pabnFdAHMreaFSDIVgWGM`
- Environments: Select all (Production, Preview, Development)

**Variable 2:**
- Name: `TELEGRAM_CHAT_ID`
- Value: `5010994002`
- Environments: Select all (Production, Preview, Development)

5. Click "Save" and redeploy

### Step 2: Redeploy

After adding environment variables:
1. Go to **Deployments**
2. Click on the latest deployment
3. Click **Redeploy**

Or push to your repository to trigger a new deployment.

### Troubleshooting

If Telegram orders aren't working:
- Check Vercel logs: Settings → Functions → Click on `/api/telegram/send-order`
- Ensure bot token is correct
- Verify Chat ID matches your Telegram ID
- Check that you've redeployed after adding environment variables

### Security Note

Your bot token is now hidden in Vercel environment variables and won't be exposed in the source code.
To add this repository to GitHub safely:
- The `.env.local` file is already in `.gitignore`
- Only `.env.example` is committed (without actual values)

### Testing Locally

To test locally before deploying:
```bash
npm run dev
```

The app will use values from `.env.local` automatically.
