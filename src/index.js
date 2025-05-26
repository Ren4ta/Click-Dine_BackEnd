
const supabase = require('./supabase'); // usa ./ o la ruta correcta

(async () => {
  const { data, error } = await supabase
    .from('usuario')
    .select('*');

  if (error) {
    console.error('❌ Error al consultar:', error);
  } else {
    console.log('✅ Usuarios:', data);
  }
})();
