const { Book } = require('../models');

const book1 = new Book({
    title: '451° по Фаренгейту',
    authors: ['Рей Брэдбери'],
    description: 'Топ1',
    favorite: true,
    fileCover: '',
    fileName: '2020-12-12T11-35-27.933Z-book.txt',
    fileBook: 'book1.txt',
});

const book2 = new Book({
    title: '1984',
    authors: ['Джордж Оруэлл'],
    description: 'Топ2',
    fileCover: '',
    fileName: '2020-12-12T11-44-42.938Z-book.txt',
    fileBook: 'book2.txt',
});

const book3 = new Book({
    title: 'Шантарам',
    authors: ['Грегори Дэвид Робертс'],
    description: 'Топ3',
    fileCover: '',
    fileName: '2020-12-12T11-44-52.363Z-book.txt',
    favorite: true,
    fileBook: 'book3.txt',
});

module.exports = [book1, book2, book3];