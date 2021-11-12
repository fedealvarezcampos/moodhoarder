export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const BOARDS_BUCKET = 'boards';

export const supabaseHost = 'https://bluhemglezuxswtcifom.supabase.in/storage/v1/object/public/boards/';

export type Profile = {
    id: string;
    updated_at: string;
};
