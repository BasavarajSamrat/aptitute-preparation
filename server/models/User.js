// 
// Import mongoose
const mongoose = require('mongoose');

// Create a new schema for user data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Ensures that username is required
        unique: true,   // Ensures that username is unique
        trim: true      // Removes extra spaces around the username
    },
    password: {
        type: String,
        required: true, // Ensures that password is required
        minlength: 6    // Enforces minimum length for password
    }
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in other parts of your application
module.exports = User;
