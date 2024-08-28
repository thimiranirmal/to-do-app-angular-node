// routes/taskRoute.js
const express = require('express');
const router = express.Router();

//Import Task Controller
const taskController = require('../controllers/taskController');


//Get All Tasks Route
router.get('/', taskController.getTasks);

//Get Task Route
router.get('/:id', taskController.getTask);

//Create Task Route
router.post('/', taskController.createTask);

//Update Task Route
router.put('/:id', taskController.updateTask);

//Delete Task Route
router.delete('/:id', taskController.deleteTask);

module.exports = router;
