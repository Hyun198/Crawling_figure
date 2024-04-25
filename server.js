require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const Poison_scrapeWebsite = require('./crawl');

const PORT = process.env.PORT
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'public',)));




app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
})

app.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const data1 = await Poison_scrapeWebsite('https://poisonapple.co.kr', keyword);
        console.log(data1);
        res.json(data1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})