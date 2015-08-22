var middleWares = require("./lib/middlewares")

var employeeService = middleWares.services ? middleWares.services.employee : {};

employeeService.addEmployee("Sandeep", "Pandey", "trainer", "sanpan", function(err, row){
    if(err){
        console.log("error while inserting record", err)
    }else{
        console.log(row);
    }
})