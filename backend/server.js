const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
    try {
        const { data = [], email = "john@xyz.com", name = "john_doe", dob = "17091999" } = req.body;

        const formattedName = name.trim() ? name.trim().replace(/\s+/g, '_') : "john_doe";
        const formattedDob = dob.trim() ? dob.trim() : "17091999";
        const user_id = `${formattedName}_${formattedDob}`;
        const roll_number = "ABCD123";

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input format' });
        }

        const numbers = [];
        const alphabets = [];
        const highest_alphabet = [];

        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[A-Za-z]$/.test(item)) {
                alphabets.push(item);
            }
        });

        if (alphabets.length > 0) {
            highest_alphabet.push(alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b));
        }

        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
