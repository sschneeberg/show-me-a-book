//functions (move to top later)
//get userInput -- to run on submit
//pick random book
function chooseRandomBook(books) {
    //pick random book: Math.floor(Math.random()*works.length)
    index = Math.floor(Math.random() * books.length);
    return books[index];
}

function getCoverImage(id) {
    cover = `http://covers.openlibrary.org/b/id/${id}-M.jpg`;
    return cover;
}
//create new element
function createNewElement(tagName, text) {
    // create a new element with tagName
    const newElement = document.createElement(tagName);
    // set the textContent to the new element  
    newElement.textContent = text;
    // return the new element
    return newElement;
}

//create book element
function createBookElement(book) {
    //remove current container if up
    //create new one
    const container = createNewElement('div');
    container.classList.add('displayContainer');
    const cover = createNewElement('img');
    cover.setAttribute('src', book.cover);
    const title = createNewElement('h3', book.title);
    const author = createNewElement('p', book.author);
    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(cover);
    return container
}

function createErrorElement() {
    //remove current container if up
    //create new one
    const container = createNewElement('div');
    container.classList.add('displayContainer');
    const error = createNewElement('h3', '0 Results Found');
    const msg = createNewElement('p', 'No books match your search criteria, please try another keyword.');
    container.appendChild(error);
    container.appendChild(msg);
    return container
}

function clearDisplay() {
    const oldDisplay = document.querySelector('.displayContainer');
    document.querySelector('main').removeChild(oldDisplay);
}

//search for book 
function fetchBook(genre) {
    fetch(`http://openlibrary.org/subjects/${genre}.json`)
        .then(response => response.json())
        .then(searchCriteriaData => {
            let book = chooseRandomBook(searchCriteriaData.works);
            const bookInfo = {
                title: book.title,
                author: book.authors[0].name,
                //LATER: list all authors
                coverId: book.cover_id
            }
            bookInfo.cover = getCoverImage(bookInfo.coverId);

            //create new element and display
            if (document.querySelector('.displayContainer') === null) {
                //create display 
                const display = createBookElement(bookInfo);
                document.querySelector('main').appendChild(display);
            } else {
                //clear old then create new
                clearDisplay();
                const display = createBookElement(bookInfo);
                document.querySelector('main').appendChild(display);
            }

        })
        .catch(error => {
            console.log(error);

            if (document.querySelector('.displayContainer') === null) {
                //create display 
                const display = createErrorElement();
                document.querySelector('main').appendChild(display);
            } else {
                //clear old then create new
                clearDisplay();
                const display = createErrorElement();
                document.querySelector('main').appendChild(display);
            }
        })
}


//on click of button:
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const genre = document.querySelector('input').value;
        const searchCriteria = genre.toLowerCase();
        fetchBook(searchCriteria);

    })

})