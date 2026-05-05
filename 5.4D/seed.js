const mongoose = require('mongoose');
const Book = require('./models/book.model');

mongoose.connect('mongodb://127.0.0.1:27017/booksDB');

const data = [
    {
        id: "b1",
        title: "The Three-Body Problem",
        author: "Liu Cixin",
        year: 2008,
        genre: "Science Fiction",
        summary: "Alien civilization contact.",
        price: "25.50"
    },
    {
        id: "b2",
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        year: 1847,
        genre: "Classic",
        summary: "Governess story.",
        price: "22.00"
    },
    {
        id: "b3",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Classic",
        summary: "Love and society.",
        price: "20.00"
    },
    {
        id: "b4",
        title: "The English Patient",
        author: "Michael Ondaatje",
        year: 1992,
        genre: "Historical Fiction",
        summary: "WWII story.",
        price: "24.00"
    },
    {
        id: "b5",
        title: "Small Gods",
        author: "Terry Pratchett",
        year: 1992,
        genre: "Fantasy",
        summary: "Discworld story.",
        price: "21.50"
    }
];

(async () => {
    // Delete existing data to remove data duplication issues
    await Book.deleteMany({});
    console.log("[-] Old data removed");

    await Book.insertMany(data);
    console.log('[+] New data inserted');
    
    mongoose.connection.close();
})();