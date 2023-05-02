'use strict';

const mainContainer = document.querySelector('.container'); //selects the main container that is the parent of all the content on the page
const addBookBtn = document.querySelector('.add-book'); //selects the "+ add book" button
const addBookModal = document.querySelector('.book-modal'); //selects the modal that should appear when the "+ add book" button is pressed
const bookModalSubmitBtn = document.querySelector('.book-submit'); //selects the submit button in the modal window
const bookTitle = document.getElementById('book-name'); //selects the title input
const bookAuthor = document.getElementById('author'); //selects the author input
const numberOfPages = document.getElementById('numOfPages'); //selects the number of pages input
const isRead = document.getElementById('book-read'); //selects the checkbox associated with whether or not a book has been read
const main = document.querySelector('.main-content'); //selects the container that will display each book

//an array that will store all instances of Book
const booksLibrary = [];

/**
 * Object Constructor for Book
 * 
 * @param {string} title - takes the name of the book
 * @param {string} author - takes the author's name
 * @param {number} pages - number of pages in the book
 * @param {string} readOrNot - takes a value of null or read 
 */
function Book(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
}

/**
 * takes an instance of Book and pushes it into the booksLibrary array
 * 
 * @param {object} book 
 */
function addBookToLibrary(book) {
    booksLibrary.push(book);
}

/**
 * this function generates a card element in the DOM to display information about the book
 * 
 * @param {object} book - an instance of the Book object
 */
function populateLibrary(book) {
    //cardConent will be used to fill up the innerHTML of the element, and will populate it with information about the book
    let cardContent = `
        <h5>${book.title}</h5>
        <h5>${book.author}</h5>
        <h5>${book.pages}</h5>
        <button class="${book.readOrNot === null ? `not-read` : `read`} btn">${book.readOrNot === null ? `Unread` : `Read`}</button>
        <button class="remove btn">Remove</button>
    `
    let newBook = document.createElement('div');
    newBook.classList.add('card');
    newBook.innerHTML = cardContent;
    main.append(newBook); //appends to the main element, so each a new entry goes after the old entries
}

/**
 * clears the input fields of the modal window so its back to default
 */
function clearInputFields() {
    bookTitle.value = '';
    bookAuthor.value = '';
    numberOfPages.value = '';
    isRead.checked = false;
}

//"+ add book" button opens up a modal window 
addBookBtn.addEventListener('click', function (e) {
    e.preventDefault(); //prevents button from reloading the page
    addBookModal.classList.toggle('hide-display'); //removes the .hide-display class that is added by default
    mainContainer.classList.toggle('blur'); //adds the blur class to mainContainer so entire background is blurred and only the modal window appears normal
});


//when the user presses submit in the "add a book" modal window it adds the book to the webpage
bookModalSubmitBtn.addEventListener('click', function (e) {
    if (bookTitle.validity.valueMissing) {
        bookTitle.setCustomValidity('Please enter the book title');
        bookTitle.style.border = '2px solid red';
        return;
    } else {
        bookTitle.setCustomValidity('');
        bookTitle.style.border = '2px solid black';
    }
    if (bookAuthor.validity.valueMissing) {
        bookAuthor.setCustomValidity('Please enter the book\s author');
        bookAuthor.style.border = '2px solid red';
        return;
    } else {
        bookAuthor.setCustomValidity('');
        bookAuthor.style.border = '2px solid black';
    }
    if (numberOfPages.validity.valueMissing) {
        numberOfPages.setCustomValidity('Please enter the book\s author');
        numberOfPages.style.border = '2px solid red';
        return;
    } else {
        numberOfPages.setCustomValidity('');
        numberOfPages.style.border = '2px solid black';
    }
    //gets the user's input
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = numberOfPages.value;
    let bookRead = null; //by default the book is unread so its null
    if (isRead.checked) bookRead = isRead.value; //but if the completed book option is checked the value changes to read
    addBookToLibrary(new Book(title, author, pages, bookRead)); //creates a new instance of Book with the values collected and stores it into the array
    populateLibrary(booksLibrary.at(-1)); //we want to populate the page with the last object as the other ones would have already been populated
    addBookModal.classList.toggle('hide-display'); //closes the modal
    mainContainer.classList.toggle('blur'); //removes the blur from the page
    clearInputFields();
});

//if the user pressed "remove" the card is removed from the webpage
main.addEventListener('click', function (e) {
    //used event delegation to only require one addEventListener, anything within the main element that contains the class "remove" will only activate the eventListener
    if (e.target.classList.contains('remove')) {
        e.preventDefault();
        e.target.parentElement.remove();  //removes the parent element of "remove" which would be the "card" element
    }
});

//allows the user to switch between read or unread after they've pressed submit
main.addEventListener('click', function (e) {
    if (e.target.classList.contains('read')) { //if the button pressed contains the class "read" the event listener is fired
        e.preventDefault();
        e.target.classList.toggle('read');
        e.target.classList.toggle('not-read');
        e.target.innerHTML = "Unread";
    } else if (e.target.classList.contains('not-read')) { //if the button pressed contains the class "not-read" the event listener is fired
        e.preventDefault();
        e.target.classList.toggle('not-read');
        e.target.classList.toggle('read');
        e.target.innerHTML = "Read";
    }
});