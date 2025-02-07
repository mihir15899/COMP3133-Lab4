const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email']
    },
    address: {
        street: { type: String, required: true },
        city: {
            type: String,
            required: true,
            match: [/^[a-zA-Z\s]+$/, 'City name must contain only alphabets and spaces']
        },
        zipcode: {
            type: String,
            required: true,
            match: [/^\d{5}-\d{4}$/, 'Invalid Zip Code format (should be 12345-1234)']
        }
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d-\d{3}-\d{3}-\d{4}$/, 'Invalid Phone format (should be 1-123-123-1234)']
    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(v);
            },
            message: 'Invalid Website URL (must start with http or https)'
        }
    }
});

module.exports = mongoose.model('User', UserSchema);
