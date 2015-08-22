var model = require("../../model");
var employee = model.employee;

var employeeService = module.exports;

employeeService.addEmployee = function (fname, lname, designation, userName, managerUserName, cb) {

    if (!cb) {
        cb = managerUserName;
        managerUserName = null;
    }
    if (managerUserName) {
        employee.find("userName", managerUserName, function (err, rows) {
            if (rows.length == 1) {
                employee.insert(fname, lname, designation, userName, rows[0].id, cb);
            }
        })
    }else{
        employee.insert(fname, lname, designation, userName, cb);
    }
}

employeeService.fetch = function (cb) {
    employee.fetch(cb);
}