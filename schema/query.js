const booksData = require('./data')

const Query = {
    books: async ({limit},context) => {
        return limit && limit>0 ? booksData.slice(0, limit): booksData;
    },
    book: async ({id},context) => {
        return booksData.find(book => book.id === id);
    }
};

module.exports = Query;