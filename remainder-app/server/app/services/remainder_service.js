import Reminder from "../models/remainder.js";



export const save = async(newRemainder) => {
    const remainder = new Reminder(newRemainder);

    return remainder.save();

}

export const update = async(id,updatedRemainder) =>{
    const remainder = Reminder.findByIdAndUpdate(id,updatedRemainder).exec();

    return remainder;
}

export const get = async(id) => {
    const remainder = Reminder.findById(id).exec();
    return remainder;
}

export const remove = async(id) => {
    const remainder = Reminder.findByIdAndDelete(id).exec();
    return remainder;
}

export const search = async(params) => {
    const remainder =  Reminder.find(params).exec();
    return remainder;
}