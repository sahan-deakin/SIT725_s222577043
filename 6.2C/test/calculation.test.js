const chai = require('chai');
const expect = chai.expect;

const { calculateTotalBookPrice } = require('../utils/book-total-price-calculator');

describe('Total Book Price Calculation Test', () => {

  it('should calculate total price correctly', () => {
    const books = [{ price: 10 }, { price: 20 }];
    expect(calculateTotalBookPrice(books)).to.equal(30);
  });

  it('should return 0 for empty array', () => {
    expect(calculateTotalBookPrice([])).to.equal(0);
  });

  it('should throw error for invalid input type', () => {
    expect(() => calculateTotalBookPrice("invalid"))
      .to.throw('Input must be an array');
  });

  it('should throw error for invalid price', () => {
    const books = [{ price: -5 }];
    expect(() => calculateTotalBookPrice(books))
      .to.throw('Invalid price value');
  });

});