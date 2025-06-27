en databsase tiene que estar los archivos con el script de la bd

en configs las clases de configuracion de servicios o modulos ejemplo: clases con la config para el acceso a postgres mas en presentacion de arqui

controllers lases que contienen un grupo de rutas 

entities clases de negocio que se utilizan en la app, ej user.js

helpers: clases que se utilizan dentro de toda la app ej: validaciones.js

middlewares clases o modulos que contienen middlewares que se agregan a express

repositories: clases que saben todo sobre una tabla, campos tipos de datos, acciones que se pueden realizar sobre las mismas etc. ej: metodo insert en la tabla users

services clases que saben un poco mas que las tablas ej: un insert aca valida si sus datos son correctos luego llama al insert del repository y si esta todo bien lo hace

