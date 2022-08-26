const User = require('../model/User')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const getTask = async(req, res) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async(err, decoded) => {
            if(err) return res.sendStatus(403)
            const userName = decoded.username;
            const userInfo = await User.findOne({ username: userName }).exec();
            if(!userInfo) return res.sendStatus(401);
            res.json(userInfo.tasks);
        }
    ) 
};
const newTask = async(req, res) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    const todo = req.body;
    const newTaskObject = {
        taskId: uuidv4(),
        task: todo.task
    }
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async(err, decoded) => {
            if(err) return res.sendStatus(403)
            const userName = decoded.username;
            const userInfo = await User.findOne({ username: userName }).exec();
            if(!userInfo) return res.sendStatus(401);
            userInfo.tasks.push(newTaskObject);
            const results = await userInfo.save()
            res.json({results})
        }
    )
}
const deleteTask = async(req, res) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    const { task } = req.body;
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async(err, decoded) => {
            if(err) return res.sendStatus(403)
            const userName = decoded.username;
            const userInfo = await User.findOne({ username: userName }).exec();
            if(!userInfo) return res.sendStatus(401);
            const discoveredTaskIndex = userInfo.tasks.findIndex((todo) => todo.task === task)
            if(discoveredTaskIndex === -1) return res.sendStatus(400)
            userInfo.tasks.splice(discoveredTaskIndex, discoveredTaskIndex+1);
            await userInfo.save();
            res.json({ 'message': `Task ${task} Successfully deleted` })
        }
    )
}


module.exports = { getTask, newTask, deleteTask }
