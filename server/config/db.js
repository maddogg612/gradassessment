const mongoose = require('mongoose')

const connectDB = async ()=>{
  try{
    await mongoose.connect('mongodb+srv://codesmith:codesmith@cluster0.sfw1p.mongodb.net/codesmith?retryWrites=true&w=majority',{
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
  })  
    console.log('Connected to MondoDB')
  }catch(err){
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

module.exports =  connectDB