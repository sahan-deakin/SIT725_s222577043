const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose.connect("mongodb://127.0.0.1:27017/bookStoreDB");

const seedData = async () => {
  try {
    // Delete existing data to remove data duplication issues
    await Book.deleteMany({});
    console.log("[-] Old data removed");

    // Insert new initial data
    const sampleBooks = [
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Self Development",
        price: 24.99,
        rating: 4.8,
        coverUrl: "images/rdpd_book.jpg",
      },
      {
        title: "That is Not My Name",
        author: "Megan Lally",
        category: "Thriller",
        price: 21.5,
        rating: 4.6,
        coverUrl: "images/tinmn_book.jpg",
      },
      {
        title: "Only Murder",
        author: "Rylie Dark",
        category: "Thriller",
        price: 18.99,
        rating: 4.4,
        coverUrl: "images/om_book.jpg",
      },
    ];

    await Book.insertMany(sampleBooks);

    console.log("[+]Initial data inserted");
    mongoose.connection.close();

  } catch (err) {
    console.error(err);
  }
};

seedData();