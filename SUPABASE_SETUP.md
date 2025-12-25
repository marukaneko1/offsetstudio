# Supabase Setup Instructions

To ensure all form submissions are stored permanently and can't be deleted, we're using Supabase (PostgreSQL database).

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account (or log in if you already have one)
3. Click "New Project"

## Step 2: Create a New Project

1. **Project Name**: `offsetstudio` (or any name you prefer)
2. **Database Password**: Create a strong password (save it securely)
3. **Region**: Choose the closest region to your users
4. Click "Create new project"
5. Wait 2-3 minutes for the project to be set up

## Step 3: Get Your API Keys

1. Once your project is ready, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

## Step 4: Create the Database Table

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the SQL from `supabase-schema.sql` file
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 5: Add Environment Variables

### For Local Development (.env.local):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### For Vercel Production:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add these three variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` = Your service_role key (keep this secret!)

## Step 6: Verify It Works

1. Submit a test form on your website
2. Go to Supabase → **Table Editor** → **submissions**
3. You should see your test submission

## Benefits

✅ **Permanent Storage**: Data is stored in PostgreSQL and won't be lost
✅ **Backed Up**: Supabase automatically backs up your database
✅ **Scalable**: Free tier includes 500MB database, 2GB bandwidth
✅ **Secure**: Row Level Security (RLS) protects your data
✅ **Queryable**: Easy to search, filter, and export data

## Data Safety

- All submissions are automatically saved to Supabase
- ClickUp integration still works as a backup/notification
- Data persists even if you redeploy or restart your server
- You can export data anytime from Supabase dashboard

## Troubleshooting

If you see errors:
1. Make sure all environment variables are set correctly
2. Verify the SQL schema was run successfully
3. Check that your Supabase project is active (not paused)
4. Ensure the service_role key is correct (not the anon key)

