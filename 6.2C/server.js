const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;



app.use(express.static(__dirname + '/public'));
app.use(express.json());

// routes
const bookRoutes = require('./routes/books.routes');
app.use('/api/books', bookRoutes);

// integrity route
app.get('/api/integrity-check42', (_req, res) => res.sendStatus(204));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/booksDB');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;