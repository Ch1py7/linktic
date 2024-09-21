import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { config } from './config'

export const client = createClient<Database>(config.supabase.url, config.supabase.key)
