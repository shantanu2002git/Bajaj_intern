import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const USER_ID = "saurabh_shukla_13042004";
const EMAIL = "saurabh1258.be21@chitakrauniversity.edu.in";
const ROLL_NUMBER = "2111981258";

app.get('/', (req, res) => {
    res.send("API is working");
});

app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid data provided" });
    }

    const response = {
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: []
    };

    data.forEach(item => {
        if (typeof item === 'number') {
            if (item % 2 === 0) {
                response.even_numbers.push(item);
            } else {
                response.odd_numbers.push(item.toString());
            }
        } else if (typeof item === 'string') {
            if (item.length === 1 && /[a-zA-Z]/.test(item)) {
                response.alphabets.push(item.toUpperCase());
            }
        }
    });

    res.json(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});