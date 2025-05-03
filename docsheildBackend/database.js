const mysql = require('mysql2') ;  

module.exports= mysql.createConnection(
{
    host : "localhost" , 
    user : 'root' , 
    password : 'karim_cv_a1b2c3' , 
    database : 'souqdz_db'
}
)
