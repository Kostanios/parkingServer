const {Schema, model} = require('mongoose');

const schema = new Schema ({
    arrivalDate: {
        type: String,
        required: true
    },
    nomer: {
        type: String,
        required: true
    }
  })
  
  module.exports = model('Nomer', schema)