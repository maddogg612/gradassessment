const connectDB =require('./config/db')
const express =require('express')
const path =require('path')
const messageController = require('./controllers/messageController')
const authController = require('./controllers/authController')
const app = express()
const cookieParser = require("cookie-parser");

app.use(cookieParser())

//Needed to recognize requests objects as JSON
app.use(express.json());


connectDB();

//Bring in port from .env file
const PORT = 3000;

//Tell express to use static files in frontend; therefore their paths do not have to be referenced in index.html.
app.use(express.static('assets'))
//Have express serve index.html
app.get('/', (req,res)=>{
  // messageController.getMessages,
  res.sendFile(path.join(__dirname, '../views/index.html'))
  // return res.status.json(res.locals.messages)
})

app.get('/messages',
  messageController.getMessages,
  (req,res) => {
    console.log('In get messages')
    res.send(res.locals.messages)
    // return res.status.json(res.locals.messages)
  }
)
app.post('/api', 
messageController.postMessage,
authController.setSSIDCookie,
(req,res) => {
  console.log('Response in post message: ',res.locals.message)
  console.log('Cookies: ', req.cookies)
  // authController.setSSIDCookie
  res.status(200)
  res.send(res.locals.message)
  //.json(res.locals.message)
})

app.delete('/api', 
authController.checkId,
messageController.deleteMessage,
(req,res) => {
  console.log('Response in delete message: ',res.locals.message)
  return res.status(200).json(res.locals.message)
})

//Global error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
