// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ไปเอาค่าจาก Supabase -> Project Settings -> API
const supabaseUrl = 'https://djqorxojdwrdnrzqxzeg.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqcW9yeG9qZHdyZG5yenF4emVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NDYzMTIsImV4cCI6MjA4NTUyMjMxMn0.ZRCS9nFD47R7xqeROfg6JeXdE34rSXGJt07UQ81LQ4A'

export const supabase = createClient(supabaseUrl, supabaseKey)