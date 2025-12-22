# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details and wait for it to be created

## 2. Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy your:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public** key (the long one under "Project API keys")

## 3. Set Environment Variables

### For Local Development

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:3001
```

### For Railway Deployment

Add these environment variables in your Railway service settings:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
- `VITE_API_URL` - Your backend Railway URL

## 4. Run Database Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run in the SQL Editor

This creates:
- `profiles` - User profiles
- `user_progress` - XP, level, streaks
- `lesson_progress` - Per-lesson progress tracking
- `user_settings` - User preferences
- `practice_stats` - Practice mode statistics

Plus Row Level Security policies so users can only access their own data.

## 5. Configure Auth Settings

1. Go to **Authentication** → **Providers**
2. Email is enabled by default
3. Optionally configure:
   - **Email Templates** for custom branding
   - **URL Configuration** for redirects (set Site URL to your deployed frontend URL)

### For Magic Link Auth

Make sure in **Authentication** → **URL Configuration**:
- **Site URL**: `https://your-frontend.railway.app` (or `http://localhost:5173` for local dev)
- **Redirect URLs**: Add both your production and local URLs

## 6. Test Authentication

1. Start your local dev server: `npm run dev`
2. Click "Sign In" in the header
3. Create an account or use magic link
4. Your progress will now sync to Supabase!

## Troubleshooting

### "Supabase credentials not found" in console
- Make sure your `.env` file exists and has the correct values
- Restart your dev server after adding env vars

### Auth not working in production
- Check Railway environment variables are set correctly
- Make sure Site URL is configured in Supabase Auth settings

### Data not syncing
- Check browser console for errors
- Verify RLS policies are created (run the migration SQL)

