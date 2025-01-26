require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const sequelize = require('./db')
const User = require('./models/User')
const Video = require('./models/Video')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cookieParser = require('cookie-parser')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'preview')))
app.use(express.static(path.resolve(__dirname, 'videos')))
app.use(cors({origin: true, methods: 'GET, POST, DELETE, PUT', credentials: true}));
app.use(fileUpload({}))
app.use(cookieParser());
app.use(express.static('static'))
app.use('/', router)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: "WORKING"})
})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}

start()