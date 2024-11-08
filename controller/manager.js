const express = require('express');
const { manager: Manager, task : Task, abstractTask : AbstractTask } = require('../schema/managerSchema'); // Importing the manager model
const {generate : generator, fourDigitGenerate : generatorI } = require('../helper/generator');

const router = express.Router();

// GET all managers
router.get('/managers/all', async (req, res) => {
    try {
        const users = await Manager.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/managers/add', async (req, res) => {
    const data = req.body;
    const user = new Manager({
        uid : data.uid+generatorI(),
        password : data.password,
        task : []
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Error details:', err);  // Log full error
        res.status(400).json({ message: err.message, error: err });
    }
});

router.post('/managers/create', async(req, res) => {
    try {
        const data = req.body;
        const taskID = generator();
        const task = new Task({
            taskid : taskID,
            taskName : data.taskName,
            managerid : data.managerid,
            start : new Date(data.start),
            end : new Date(data.end),
            done : false
        });
        const abstractTask = new AbstractTask({
            taskid : taskID,
            taskName : data.taskName
        });
        const findManager = await Manager.findOne({uid : data.managerid})
        findManager.task.push(abstractTask);
        await findManager.save();
        await task.save();  // Update the task into the task channel as well...
        res.status(200).send(`manager ${data.managerid} created a task !!`);
    } catch (error) {
        res.status(400).json({message : error.message, error : error });
    }
});


module.exports = router;
