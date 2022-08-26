require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/userAuth')

// first function to connect to mongo DB

const connectToDB = async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://Hove:Aakashs1ngh@cluster0.bfkia4j.mongodb.net/?retryWrites=true&w=majority", 
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
    }catch(err) {
        console.error(err)
    }
}
connectToDB()

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use('/register', require('./routes/api/register'))
app.use('/login', require('./routes/api/login'))

app.use(verifyJWT)

app.use('/tasks', require('./routes/api/tasks'))
app.get('/', (req, res) => {
    res.send('hello World')
})

const PORT = 8000;

mongoose.connection.on('connected', () => {
    console.log("Connected to DataBase");
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
})
