import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://etwxitwtceqodpcathcn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
// eslint-disable-next-line no-unused-vars
const supabase = createClient(supabaseUrl, supabaseKey)