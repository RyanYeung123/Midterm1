const mongoose = require('mongoose');

const StudentsSchema = mongoose.Schema({
    name: String, 
    age: Number, 
    major: String,
    createdDate: Date,
    updatedDate: Date
},{
    timestamps: true
});

module.exports = mongoose.model('Students',StudentsSchema);