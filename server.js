/**
 * Midterm API Project - COMP229 Winter 2024
 * 
 * Challenge: Implement the API logic for managing a collection of books!
 * 
 * Here's the deal:
 * You have a server running on port 8080, and an array of books.
 * Your mission, should you choose to accept it, is to implement the missing logic
 * for each of the following API endpoints. 
 * 
 * Endpoints:
 * 1. GET /api/items       - Retrieve the full list of books.
 * 2. GET /api/items/search?title=[partial title name] - Retrieve books by a partial title match.
 * 3. GET /api/items/:id   - Retrieve a book by its index.
 * 4. POST /api/items      - Add a new book to the collection.
 * 5. PUT /api/items/:id   - Update a book by its index.
 * 6. DELETE /api/items/:id - Remove a book from the collection by its index.
 * 
 * The array of books is already defined for you, but you need to bring the logic
 * to life. Test your work using tools like Postman or Thunder Client.
 * 
 * Submission Requirements:
 * 1. **Screenshots**: Provide screenshots of your API tests, clearly showing:
 *    - There should be 1 screenshot per Endpoint (6 in total)
 *    - The API request.
 *    - The request body (where applicable).
 *    - The successful response.
 *    Use Postman, Thunder Client, or another similar API testing tool.
 * 
 * 2. **Code Submission**: 
 *    - Include your code in a **.zip** file.
 *    - Provide a GitHub link to your repository containing the project.
 *    - Make sure all screenshots are clearly visible in your submission.
 * 
 * Good luck, and may your code be bug-free!
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of strings (books)
let books = [
  { id: 1, title: 'The Hobbit' },
  { id: 2, title: '1984' },
  { id: 3, title: 'To Kill a Mockingbird' },
  { id: 4, title: 'Moby Dick' },
  { id: 5, title: 'Pride and Prejudice' }
];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints


app.get('/api/items', (req, res) => {


  res.json(books);

});

app.get('/api/items/search', (req, res) => {
  const title = req.query.title.toLowerCase();  

  
  const matchingBooks = books.filter(book =>
    book.title.toLowerCase().includes(title)
  );

  if (matchingBooks.length > 0) {
    res.json(matchingBooks);  
  } else {
    res.status(404).send('No books found');  
  }
});


app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const book = books.find(b => b.id === id);  

  if (book) {
    res.json(book);  
  } else {
    res.status(404).send('book not found');  
  }
});


app.post('/api/items', (req, res) => {
  const newBook = {
    id: books.length + 1,  
    title: req.body.title  
  };

  books.push(newBook);  
  res.status(201).json(newBook);  
});


app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);  
  const bookIndex = books.findIndex(b => b.id === id);  

  if (bookIndex !== -1) {  
    books[bookIndex].title = req.body.title;  
    res.json(books[bookIndex]);  
  } else {
    res.status(404).send('Book not found');  
  }
});


app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);  
  const bookIndex = books.findIndex(b => b.id === id);  

  if (bookIndex !== -1) {  
    const deletedBook = books.splice(bookIndex, 1);  
    res.json(deletedBook[0]);  
  } else {
    res.status(404).send('Book not found');  
  }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
