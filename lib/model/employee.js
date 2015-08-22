var mysqlModel = require("./model")

var employee = module.exports;

var getColumns = function(isManagerIdPresent){
    var columns = "`first_name`, `last_name`, `designation`, `username`";
    if(isManagerIdPresent){
        columns = columns + ",`manager_id`";
    }
    return columns;
}
var formEmplData = function(fname, lname, designation, userName, managerId){
    if(fname && lname && designation){
        var row =  '"' + fname  +'","' + lname + '","' + designation +'","' +userName+ '"';
            row = managerId ? row + ',"' + managerId +'"' : row;

        return row;
    }
}
/**
 *
 * @param fname
 *  required
 * @param lname
 *  required
 * @param designation
 *  required
 * @param userName
 *  required
 * @param managerId
 * @param cb
 */
employee.insert = function(fname, lname, designation, userName, managerId, cb){
    mysqlModel.startConnection();
    if(!cb){
        cb = managerId;
        managerId = null;
    }
    var row = formEmplData(fname, lname, designation, userName, managerId);
    mysqlModel.insert(row, getColumns(managerId), "employee", function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log(row);
            cb(err);
        }
    });
    mysqlModel.endConnection();
}

employee.find = function(columName, value, cb){
    mysqlModel.startConnection();
    mysqlModel.find(columName, value, "employee", cb);
    mysqlModel.endConnection();
}