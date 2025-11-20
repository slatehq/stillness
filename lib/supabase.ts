import { createClient } from '@supabase/supabase-js';

// Configuration with provided credentials
const supabaseUrl = 'https://bbflrostnobwzaytxytp.supabase.co';
const supabaseKey = 'sb_publishable_zCM2jH_VktjCw-bqnoqjCA_rnBX82vt';

export const supabase = createClient(supabaseUrl, supabaseKey);