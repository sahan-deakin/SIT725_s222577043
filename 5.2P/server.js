const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Routes
const bookRoutes = require('./routes/books.routes');
app.use('/api/books', bookRoutes);

// Set Root
app.get('/', (_req, res) => {
  res.send('Welcome to Books Catalog');
});

app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});