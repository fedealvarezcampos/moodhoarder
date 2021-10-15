export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const BOARDS_BUCKET = 'boards';

export type Profile = {
    id: string;
    avatar_url: string;
    username: string;
    website: string;
    updated_at: string;
};
