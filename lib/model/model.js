var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

var model = module.exports;

model.startConnection = function () {
    connection.connect();
}
model.insert = function (row, columns, tableName, cb) {
    console.log('insert into ' + tableName +'('+columns +')'+' values (' + row + ');');
    connection.query('insert into ' + tableName +'('+columns +')'+' values (' + row + ');', cb);
}

model.fetch = function (tableName, cb) {
    connection.query('SELECT * from ' + tableName, cb);
}

model.find = function (columName, value, tableName, cb) {
    var query;
    if(typeof columName == 'String'){
        query = 'SELECT * from ' + tableName + " WHERE "+ columName + "like %"+ value +"%;";
    }else if(typeof columName == 'Number'){
        query = 'SELECT * from ' + tableName + " WHERE "+ columName + "=" + value;
    }
    connection.query(query, cb)
}

model.endConnection = function () {
    connection.end();
}
