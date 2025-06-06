import supabase from './supabase.js';

(async () => {
  const { data, error } = await supabase
    .from('categoria')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connection successful. Data:', data);
  }
})();
