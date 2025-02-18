const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
