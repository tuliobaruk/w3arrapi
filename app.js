const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let books = [
    { id: 1, title: 'Livro 1' },
    { id: 2, title: 'Livro 2' },
    { id: 3, title: 'Livro 3' },
    { id: 4, title: 'Livro 4' },
    { id: 5, title: 'Livro 5' },
];

app.get("/books", (req, res) => {
    res.send(books);
});

app.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.send(book);
    } else {
        res.status(404).send("Livro não encontrado!");
    }
});

app.post("/books", (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.send(newBook);
});

app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);
    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send("Livro não encontrado!");
    }
});

app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookToRemoveIndex = books.findIndex(book => book.id === bookId);

    if (bookToRemoveIndex !== -1) {
        const removedBook = books.splice(bookToRemoveIndex, 1);
        res.send(removedBook[0]);
    } else {
        res.status(404).send("Livro não encontrado!");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
