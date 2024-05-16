const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    });

module.exports = mongoose.model('Todo', todoSchema);