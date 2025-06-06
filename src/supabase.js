import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lxgeamhjhwiqshjuoqdv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4Z2VhbWhqaHdpcXNoanVvcWR2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAxMTEzMywiZXhwIjoyMDYzNTg3MTMzfQ.-k7ZyrRfR_Ce4SogKp6hJxZUX-RuIxOledZl13CV6oA'
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
