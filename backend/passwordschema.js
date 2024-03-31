import mongoose from "mongoose"

// Define schema
const userSchema = new mongoose.Schema({
    website: String,
    username: String,
    password: String,
    ID:String
});

// Create model
const passwords = mongoose.model('passwords', userSchema);

export default passwords;