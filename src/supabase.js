// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// It's best practice to store these in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Example table name (replace with your actual table name)
export const CRUD_TABLE_NAME = 'items' // e.g., 'tasks', 'posts'
