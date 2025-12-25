-- Update handle_new_user function to support OAuth providers (Google, etc.)
-- This function extracts display_name, full_name, and avatar_url from OAuth metadata

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    display_name = COALESCE(
      EXCLUDED.display_name,
      NEW.raw_user_meta_data->>'display_name',
      NEW.raw_user_meta_data->>'full_name',
      profiles.display_name
    ),
    avatar_url = COALESCE(EXCLUDED.avatar_url, NEW.raw_user_meta_data->>'avatar_url', profiles.avatar_url);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

