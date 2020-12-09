const { Book } = require('../models');

const book1 = new Book({
    title: '451° по Фаренгейту',
    authors: ['Рей Брэдбери'],
    description: 'Топ1',
    favorite: true,
    fileCover: 'epub',
    fileName: 'book1',
});

const book2 = new Book({
    title: '1984',
    authors: ['Джордж Оруэлл'],
    description: 'Топ2',
    fileCover: 'pdf',
    fileName: 'book2',
});

const book3 = new Book({
    title: 'Шантарам',
    authors: ['Грегори Дэвид Робертс'],
    description: 'Топ3',
    fileCover: 'fb2',
    fileName: 'book3',
    favorite: true,
});

module.exports = [book1, book2, book3];