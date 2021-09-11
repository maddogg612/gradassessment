const Message = require('../models/MessageModel')

const messageController ={}

messageController.getMessages = async (req, res, next) => {
  console.log('in get messages controller.')
  try{
    res.locals.messages = await Message.find({})
    return next()
  }
  catch(err){
    return next({
      log: 'messageController.getMessages: ERROR: Error getting messages from the database',
      message: { err: `Error occurred in messageController.getMessages. err log: ${err}` },
    })
  }
}

// messageController.postMessage = async (req,res) => {
//   console.log('in post message controller. Req.body is: ', req.body)
//   const {message,password} = req.body;
//   res.locals.message = await Message.create({message,password}, (err, message)=> {
//     return res.status(200).json(message);
//   }) 

// };

messageController.postMessage = async (req, res, next) => {
  console.log('in post message controller. Req.body is: ', req.body)
  
  try{
    const {message, password} = req.body
    res.locals.message = await Message.create({message,password})
    return next()
  }
  catch(err){
    return next({
      log: 'messageController.postMessage: ERROR: Error posting message to the database',
      message: { err: `Error occurred in messageController.postMessage. err log: ${err}` },
    })
  }
}

  

messageController.deleteMessage = async (req, res, next) => {
  console.log('Cookie: ', req.cookies, 'Password: ', req.body._id)
  // console.log('in delete message controller. Req.body is: ', req.body)
  
  try{
    const {_id} = req.body
    const checkPW = await Message.findOne({_id})
    console.log("Checking pw: ", checkPW)
    if(req.cookies.pass === checkPW.password){
       res.locals.message = await Message.findOneAndDelete({_id})
    }else {
      return next()
    }
    res.locals.message = await Message.findOneAndDelete({_id})
    return next()
  }
  catch(err){
    return next({
      log: 'messageController.deleteMessage: ERROR: Error deleting message from the database',
      message: { err: `Error occurred in messageController.deleteMessage. err log: ${err}` },
    })
  }
}






module.exports = messageController;