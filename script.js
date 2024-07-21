const dialog = document.querySelector("#modal")
const showButton = document.querySelectorAll(".add")
const closeButton = document.getElementById("hide")
const bookList = document.getElementById("books")
const addBook = document.getElementById("form")
const hamburgerClose = document.getElementById("hamburger-close")
const hamburgermenu = document.getElementById("hamburger")


let myLibrary = [];

let currentIndex = myLibrary.length;
showAllBooks(myLibrary);

//constructor functiion for book object
function Book(title, author, pages, read) {

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// event for the addition of a new book

addBook.addEventListener("submit", e => {
    e.preventDefault();
    addBookToLibrary();
    dialog.close();
})

function addBookToLibrary() {


    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("checkbox").checked;

    myLibrary[currentIndex] = new Book(title, author, pages, read);
    currentIndex++

    showAllBooks(myLibrary);

}

function showAllBooks(arr) {
    bookList.innerHTML = ""
    arr.forEach((element, index) => {

        //creating book card to display 
        const book = document.createElement("li")
        book.setAttribute("class", "book")
        book.setAttribute("data-index", index)
        const title = document.createElement("p")
        title.innerHTML = "title:" + element.title
        const author = document.createElement("p")
        author.innerHTML = "author:" + element.author;
        const pages = document.createElement("p")
        pages.innerHTML = "pages:" + element.pages;

        book.append(title, author, pages)

        const div = document.createElement("div")
        div.setAttribute("class", "btns")

        const status = document.createElement("button")

        if (element.read === true) {
            status.appendChild(document.createTextNode("Read"))
            status.setAttribute("class", "read");

        }
        else {
            status.appendChild(document.createTextNode("Not Yet"))
            status.setAttribute("class", "ongoing")
        }

        const remove = document.createElement("button")
        remove.appendChild(document.createTextNode("Remove"))
        remove.setAttribute("id", "remove")

        div.append(status, remove)
        book.appendChild(div)

        const span = document.createElement("span")

        // giving the card status based on the value of read
        if (element.read == true) {
            span.innerHTML = "Completed"

        }
        else {
            span.innerHTML = "Ongoing"
        }

        book.appendChild(span)
        bookList.appendChild(book)
    });

    if (window.innerWidth <= 508) {
        close();
    }

}


// event for deletion of book and status toggle
bookList.addEventListener("click", manageBook)

function manageBook(e) {
    const target = e.target
    if (target.id == "remove") {
        const book = target.parentElement.parentElement;
        const index = book.dataset.index;
        myLibrary.splice(index, 1);
        showAllBooks(myLibrary);

    }
    else if (target.classList.contains("read") || target.classList.contains("ongoing")) {
        const book = target.parentElement.parentElement
        const index = book.dataset.index;
        myLibrary[index].read = !myLibrary[index].read
        showAllBooks(myLibrary)

    }

}
//popup for addition of new book

showButton.forEach(item => {
    item.addEventListener("click", () => {
        dialog.showModal()
    })
})

closeButton.addEventListener("click", () => {
    dialog.close();

})

// function to display completed Books
function showCompletedBooks() {

    let completedBooks = myLibrary.filter((e) => e.read === true)
    showAllBooks(completedBooks);
}
//function to display ongoing books

function showOngoingBooks() {
    let ongoingBooks = myLibrary.filter((e) => e.read === false)
    showAllBooks(ongoingBooks)
}


//delete function here

















hamburgerClose.addEventListener("click", close)
function close() {

    document.querySelector("nav").style.display = "none"
}


hamburgermenu.addEventListener("click", () => {
    document.querySelector("nav").style.display = "flex"

})


