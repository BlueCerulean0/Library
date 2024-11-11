// Selecting the DOM elements
const button = document.querySelector('.btn');
const popup = document.querySelector('.pop');
const form = document.querySelector('#bookForm');
const addedBooks = document.querySelector('.addedBooks');
const myLibrary = [];

// Loading from local sotorage when the page loads
document.addEventListener('DOMContentLoaded', loadFromStorage);

//Popup open and close
button.addEventListener('click', () => {
    popup.classList.add('visible');
});
popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('pop')) {
        event.target.classList.remove('visible');
    }
});

//Takes the input values from the form when submit is clicked and resets.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    //Get the values
    const title = document.querySelector("[name='title']").value;
    const author = document.querySelector("[name='author']").value;
    const pages = document.querySelector("[name='pages']").value;
    const score = document.querySelector("[name='score']").value;
    const status = document.querySelector("[name='status']").value;
    const progress = document.querySelector("[name='progress']").value;

    //Creating a newBook object with the values from the object constructor 
    const newBook = new Book(title, author, pages, score, status, progress);
    
    //Then it's added to the myLibrary array at the top
    myLibrary.push(newBook);
    console.log(myLibrary);
    
    //Add the new book info to the DOM so it's visible to the user.
    addBookToDom(newBook.title, newBook.author, newBook.pages, newBook.score, newBook.status, newBook.progress);
    
    //Save it to the local storage.
    saveToStorage();

    //Now reset and close the form.
    form.reset();
    popup.classList.remove('visible');
});

//Constructor to create a book object, so I can use 
// it above in the addBookToDom() function 
function Book(title, author, pages, score, status, progress) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.score = score;
    this.status = status;
    this.progress = progress;
}

//Function to actually add a new to book to the DOM!
function addBookToDom(title, author, pages, score, status, progress) {
    //This is the container that keeps all the info for one book.
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    //This is the container that keeps the books text info
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('info');
    //Title
    const titleEle = document.createElement('h5');
    titleEle.textContent = `${title}`;
    //Author
    const authorEle = document.createElement('p');
    authorEle.textContent = `Written by, ${author}`;
    //Pages
    const pagesEle = document.createElement('p');
    pagesEle.textContent = `Pages: ${pages}`;
    //Score
    const scoreEle = document.createElement('p');
    scoreEle.textContent = `Score: ${score}`;
    //Status
    const statusEle = document.createElement('p');
    statusEle.textContent = `Status: ${status}`;
    //Progress
    const progressEle = document.createElement('p');
    progressEle.textContent = `Progress: ${progress}`;
    
    //Now this is the container that keeps the cover image of the book
    const coverContainer = document.createElement('div');
    coverContainer.classList.add('cover');
    //This the actual cover image
    const imageEle = document.createElement('img');
    imageEle.src = "./images/default-cover.png";
    imageEle.alt = 'cover';
    
    //All the created elements and it's children are 
    //added to their respective container
    bookInfo.append(titleEle, authorEle, pagesEle, scoreEle, statusEle, progressEle);
    coverContainer.appendChild(imageEle);
    bookContainer.append(coverContainer, bookInfo);
    addedBooks.appendChild(bookContainer);
}

//Function to save the myLibrary array in a JSON file
function saveToStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

//Function to load anything saved in the local storage
function loadFromStorage() {
    const storedLibrary = localStorage.getItem('myLibrary');
    if (storedLibrary) {
        const books = JSON.parse(storedLibrary);
        books.forEach(book => {
            myLibrary.push(book);
            addBookToDom(book.title, book.author, book.pages, book.score, book.status, book.progress);
        })
    }
}

function deleteBook(thinking) {
    //Still thinking...
}
