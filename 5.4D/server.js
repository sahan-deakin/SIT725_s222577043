const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/booksDB');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

const bookRoutes = require('./routes/books.routes');

app.use('/api/books', bookRoutes);

// integrity check (required)
app.get('/api/integrity-check42', (_req, res) => {
  res.sendStatus(204);
});

// root route
app.get('/', (_req, res) => {
  res.send('Welcome to Books API');
});


// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// global error handler
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Server error'
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});