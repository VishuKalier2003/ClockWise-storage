const mongoose = require('mongoose');
const Connection = require('../database/entries');

const taskSchema = new mongoose.Schema({
    taskid : {type : String, required : true},
    taskName : {type : String, required : true},
    managerid : {type : String, required : true},
    start : {type : Date, required : true},
    end : {type : Date, required : true}
});

const managerSchema = new mongoose.Schema({
    uid : {type : String, unique : true, required : true},
    task : {type : [taskSchema], required : false, default : []}
});

const manager = Connection.managerConnection.model('manager', managerSchema);
const task = Connection.managerConnection.model('task', taskSchema);
module.exports = {manager, task};
