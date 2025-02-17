const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User'); // Import Mongoose model

const router = express.Router();

// User Registration Route with Express Validator
router.post(
    '/',
    [
        body('username')
            .isLength({ min: 4 })
            .withMessage('Username must be at least 4 characters long'),
        body('email')
            .isEmail()
            .withMessage('Invalid email'),
        body('address.street')
            .notEmpty()
            .withMessage('Street is required'),
        body('address.city')
            .matches(/^[A-Za-z\s]+$/)
            .withMessage('City name must contain only alphabets and spaces'),
            body('address.zipcode')
            .matches(/^\d{5}(-\d{4})?$/)
            .withMessage('Invalid Zip Code format (should be 12345 or 12345-1234)'),
        
        body('phone')
            .matches(/^1-\d{3}-\d{3}-\d{4}$/)
            .withMessage('Invalid Phone format (should be 1-123-123-1234)'),
        body('website')
            .matches(/^(https?:\/\/).+/)
            .withMessage('Invalid Website URL (must start with http or https)')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);

module.exports = router;
