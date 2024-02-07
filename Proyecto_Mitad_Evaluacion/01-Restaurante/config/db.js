const mysql = require ('mysql2');

const connection = mysql.createConnection({

  host :    'localhost', 
  user:     'root',
  password: 'root',
  database: 'restaurants' //nombre de mi BBDD no de mi tabla
  
   
})

connection.connect(function(err){
  if(err){
    console.log('error conection' + err.stack);
    return;
  }
  console.log('Base de datos conectada correctamente');
});


module.exports = connection;