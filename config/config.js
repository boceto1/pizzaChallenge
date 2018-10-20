/**
 * PUERTO
 */
process.env.PORT = process.env.PORT || 3000;



/**
 * ENTORNO
 */

    process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

 /**
  * CONEXIÓN CON LA BASE DE DATOS.
  */

 let urlDB;

 process.env.NODE_ENV==='dev'? 
     urlDB = 'mongodb://localhost:27017/pizeria':
     urlDB = process.env.MONGO_URI;
 
 
 process.env.URLDB = urlDB;



