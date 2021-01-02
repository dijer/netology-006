# netology-006

# Installation
```
npm i

Heroku
https://dijer-ejs.herokuapp.com/books
```

# MongoDb operations
```
// запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

const book1 = {
    title: 'Граф Монте-Кристо',
    authors: 'Александр Дюма',
    description: 'С самого момента своего опубликования это произведение попало в список бестселлеров и продолжает там находиться вплоть до сегодняшнего дня. ',
};

const book2 = {
    title: 'Гамлет',
    authors: 'Уильям Шекспир',
    description: 'Одна из наиболее известных книг средневековой литературы.',
};

const books = [book1, book2];

db.books.insertMany(books);


// запрос для поиска полей документов коллекции books по полю title

db.books.find(
    {
        title: true,
    }
);


// запрос для редактирования полей: description и authors коллекции books по _id записи

const { id, description, authors } = data;
db.books.updateOne(
    {
        '_id': id,
    },
    {
        $set: {
            description,
            authors,
        },
    }
);

```