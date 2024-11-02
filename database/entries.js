const mongoose = require('mongoose');

const managerConnection = mongoose.createConnection('mongodb+srv://root:root@cluster0.wrndy.mongodb.net/taskStorage');

module.exports = {managerConnection};
