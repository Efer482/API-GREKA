const mysqlConnection = require('mysql');
const connection = mysqlConnection.createConnection({
    host        : 'localhost',
    database    :  'greka',
    user        :  'root',
    password    :  ''
});

connection.connect(function(err){
    if(err) throw err
    console.log("connected");
});

module.exports = connection;