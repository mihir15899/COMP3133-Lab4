const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [4, 'Username must be at least 4 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Invalid email']
    },
    address: {
        street: { type: String, required: [true, 'Street is required'] },
        city: {
            type: String,
            required: [true, 'City is required'],
            match: [/^[A-Za-z\s]+$/, 'City name must contain only alphabets and spaces']
        },
        zipcode: {
            type: String,
            required: [true, 'Zipcode is required'],
            match: [/^\d{5}(-\d{4})?$/, 'Invalid Zip Code format (should be 12345 or 12345-1234)']
        }
        
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^1-\d{3}-\d{3}-\d{4}$/, 'Invalid Phone format (should be 1-123-123-1234)']
    },
    website: {
        type: String,
        required: [true, 'Website URL is required'],
        validate: {
            validator: function (v) {
                return /^(https?:\/\/).+/.test(v);
            },
            message: 'Invalid Website URL (must start with http or https)'
        }
    }
});

module.exports = mongoose.model('User', userSchema);
