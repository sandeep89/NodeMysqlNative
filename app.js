var restify = require("restify");
var middleWares = require("./lib/middlewares")

var server = restify.createServer();
var employeeService = middleWares.services ? middleWares.services.employee : {};

/*employeeService.addEmployee("Sandeep", "Pandey", "trainer", "sanpan", function(err, row){
    if(err){
        console.log("error while inserting record", err)
    }else{
        console.log(row);
    }
})*/

server.get("/employees", function(req, res, next){
    employeeService.fetch(function(err, rows){
        if(err){
            res.send(err);
            next()
        }else{
            res.send(rows);
            next();
        }
    });
})

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});