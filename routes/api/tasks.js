const express = require('express');
const router = express.Router();
const { getTask, newTask, deleteTask } = require('../../controller/taskController')

router.route('/')
    .get(getTask)
    .post(newTask)
    .delete(deleteTask)

module.exports = router