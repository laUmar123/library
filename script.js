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
 * @param {string} readOrNot - takes a value of false or read 
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