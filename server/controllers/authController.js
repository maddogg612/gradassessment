const authController = {}
const Message = require('../models/MessageModel')

authController.setSSIDCookie = async (req,res,next)=> {
  console.log('in post cookie controller. Req.body is: ', req.body)
  // await res.cookie('ssid', {httpOnly: true});
  await res.cookie('pass', req.body.password, {httpOnly:true});
  return next()
}

authController.checkId = async (req,res,next)=> {
  console.log('in authController.checkId controller. Req.body is: ', req.body)
  const {_id} = req.body
  const checkPW = await Message.findOne({_id})
  console.log("Checking pw: ", 'checkOW.password: ', checkPW.password, 'req.cookies.pass: ',req.cookies.pass)
  if(req.cookies.pass === checkPW.password){
    console.log('passwords match')
     res.locals.message = checkPW
     return next()
  }else {
    res.locals.message = 'Password is incorrect...Not Deleted';
    // return next()
  }
}



module.exports = authController;