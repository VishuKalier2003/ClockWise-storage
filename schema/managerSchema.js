const mongoose = require('mongoose');
const Connection = require('../database/entries');

const taskSchema = new mongoose.Schema({
    taskid : {type : String, required : true},
    taskName : {type : String, required : true},
    managerid : {type : String, required : true},
    start : {type : Date, required : true},
    end : {type : Date, required : true},
    done : {type : Boolean, required : true},
});

const abstractTaskSchema = new mongoose.Schema({
    taskid : {type : String, required : true},
    taskName : {type : String, required : true}
});

const managerSchema = new mongoose.Schema({
    uid : {type : String, unique : true, required : true},
    password : {type : String, required : true},
    task : {type : [abstractTaskSchema], required : false, default : []}
});

const manager = Connection.managerConnection.model('manager', managerSchema);
const task = Connection.managerConnection.model('task', taskSchema);
const abstractTask = Connection.managerConnection.model('abstractTask', abstractTaskSchema);
module.exports = {manager, task, abstractTask};
