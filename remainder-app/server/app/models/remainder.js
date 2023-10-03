import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    lastModifiedDate: {
      type: Date,
      default: Date.now
    },
    isCompleted: { 
      type: Boolean, 
      default: false 
  }
  
}
  );

const Reminder = mongoose.model('Reminder', ReminderSchema); 

export default Reminder;