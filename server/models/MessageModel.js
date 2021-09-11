// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
//Not sure how to properly export this and the model out of the dame file; therefore I used a db file in config
const myURI = 'mongodb+srv://codesmith:codesmith@cluster0.sfw1p.mongodb.net/codesmith?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = Schema({
  message: {type: String, required: true},
  password: {type: String, default: true},
})

module.exports = new mongoose.model('Message', messageSchema) // <-- export your model
