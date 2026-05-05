// Calculates the total price of a list of books
function calculateTotalBookPrice(books) {
  if (!Array.isArray(books)) {
    throw new Error('Input must be an array');
  }

  if (books.length === 0) {
    return 0;
  }

  let total = 0;

  books.forEach(book => {
    if (!book.price) {
      throw new Error('Book price is unavailable');
    }

    const price = typeof book.price === 'object'
      ? parseFloat(book.price.toString())
      : Number(book.price);

    if (isNaN(price) || price < 0) {
      throw new Error('Invalid price value');
    }

    total += price;
  });

  return Number(total.toFixed(2));
}

module.exports = { calculateTotalBookPrice };