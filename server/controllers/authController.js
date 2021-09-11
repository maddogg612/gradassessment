const authController = {}

authController.setSSIDCookie = async (req,res,next)=> {
  console.log('in post cookie controller. Req.body is: ', req.body)
  // await res.cookie('ssid', {httpOnly: true});
  await res.cookie('pass', req.body.password, {httpOnly:true});
  return next()
}



module.exports = authController;