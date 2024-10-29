const express = require('express')
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
const path = require('path');
const { configDotenv } = require('dotenv');
const Mongoose = require('./mongoos/Mongoose');
const MBmessage = require('./mongoos/modules/mongoosemodules');
const user = require('./mongoos/modules/user_acc')
const { json } = require('stream/consumers');
const User = require('./user_create');
const Userlogin = require('./userlogin');
const port = 5000;
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*", // your React app's origin

    }
});



app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
configDotenv()
Mongoose()
user()


app.post('/', Userlogin)
app.post('/create', User)

//To store the messages in mongoose
app.post('/app', async (req, res) => {
    const message = req.body

    try {
        const createmessage = await new MBmessage(message)
        const saved = await createmessage.save()
        res.status(200).json("sucesss")
        console.log("success..")
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/app', async (req, res) => {
    try {
        const messagearray = await MBmessage.find()
        const fdata = await messagearray.map(message => message.message)
        console.log(fdata);
        return res.status(200).json(fdata)



    } catch (error) {
        res.json('Unable to get message please reload the page')
    }

})




//Connected...
io.on("connection", (socket) => {
    let msg = 'User connected in public...'
    console.log(msg, socket.id)
    socket.emit('message', msg)
    //Normal message...
    socket.on('message', (msg) => {
        io.emit('message', msg)
    })
    //Room message when user connect with room
    socket.on('joinroom', (room1) => {
        socket.join(room1)
        console.log(`User connected in ${room1}`)
        let msg = `User connected in ${room1}`
        socket.emit('roommessage', msg)

        //Room message
        socket.on('roommessage', (msg) => {
            console.log(msg)
            io.emit('roommessage', msg)
        })
    })


    //Disconnection
    socket.on("disconnect", () => {
        console.log('user Disconnect...', socket.id);

    })


})

server.listen(port, () => {
    console.log(`hey sever is running at http://localhost:${port}`)
})


