const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
      
    },
    email: {
      type: String,
      required: true
      
    },
    password: {
      type: String,
      required: true

    },
    role: {
      type: String,
      required: true
      
    },
    seenNotificatoion: {
      type: Array,
      default: [],
    },
    unseenNotificatoion: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true
  }
)

const lecturerModel = mongoose.model('lecturer', userSchema);
module.exports = lecturerModel;