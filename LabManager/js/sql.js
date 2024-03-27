var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '619@Lm10',
    database: 'labManagement',
    });
    

function printObject(objectArray)
{
    for( obj in objectArray)
    {
        console.log(objectArray[obj]);
    }
}

exports.con = con;
    
