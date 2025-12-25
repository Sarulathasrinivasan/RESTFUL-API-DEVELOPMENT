const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to let Express read JSON data from requests
app.use(express.json());

// Mock Database (Inventory)
let inventory = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", stock: 5 },
    { id: 2, title: "1984", author: "George Orwell", stock: 3 }
];

// --- CRUD OPERATIONS ---

// 1. READ ALL (GET)
app.get('/api/books', (req, res) => {
    res.json(inventory);
});

// 2. READ ONE (GET)
app.get('/api/books/:id', (req, res) => {
    const book = inventory.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// 3. CREATE (POST)
app.post('/api/books', (req, res) => {
    const newBook = {
        id: inventory.length + 1,
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock || 1
    };
    inventory.push(newBook);
    res.status(201).json(newBook);
});

// 4. UPDATE (PUT)
app.put('/api/books/:id', (req, res) => {
    const book = inventory.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.stock = req.body.stock || book.stock;
    
    res.json({ message: "Book updated successfully", book });
});

// 5. DELETE (DELETE)
app.delete('/api/books/:id', (req, res) => {
    const initialLength = inventory.length;
    inventory = inventory.filter(b => b.id !== parseInt(req.params.id));
    
    if (inventory.length === initialLength) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(204).send(); // Success, no content to return
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Test the API at: http://localhost:${PORT}/api/books`);
});