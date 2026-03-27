const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// GET endpoint to serve book data
app.get('/api/books', (req, res) => {
    const books = [
        {
            title: "General College Chemistry",
            author: "Matt Haig",
            image: "images/chem1.png",
            category: "Science",
            price: 29.99
        },
        {
            title: "Release - Award Winning Novel",
            author: "Lucy Christopher",
            image: "images/book-novel.jpg",
            category: "Non-Fiction",
            price: 19.99
        },
        {
            title: "Shuri - A Black Panther Novel",
            author: "Nic Stone",
            image: "images/book-sci-fi.jpg",
            category: "Fiction",
            price: 14.99
        }
    ];

    res.json(books);
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});