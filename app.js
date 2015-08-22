var restify = require("restify");
var middleWares = require("./lib/middlewares")

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));
var employeeService = middleWares.services ? middleWares.services.employee : {};

server.get("/employees", function (req, res, next) {
    employeeService.fetch(function (err, rows) {
        if (err) {
            res.send(err);
            next()
        } else {
            res.send(rows);
            next();
        }
    });
})

server.post("/employees", function (req, res, next) {
    var employee = req.body;
    employeeService.addEmployee(employee.fname, employee.lname, employee.designation, employee.userName, function (err, row) {
        if (err) {
            console.log("error while inserting record", err)
        } else {
            res.send(row);
        }
    })
})
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});