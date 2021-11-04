const submitButton = document.querySelector('form button');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageNumInput = document.getElementById('pageNum');
const pageNumError = document.querySelector('.pageNumError');
const contentElement = document.querySelector('.content');
const formControls = document.querySelectorAll('.form-control');

const checkBox = document.querySelector('.checkbox');
let submissionReady = false;
//array storing book objects

let myLibrary = [];

//object constructor function

function Book(title, author, pageNum, status) {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.status = status
}

//Resets cards display and prints out cards for each book in myLibrary array
function addBookToLibrary() {
    
    let cards = document.querySelectorAll('.card');
    cards.forEach((element) => {
        element.remove();
    })
    myLibrary.forEach((book) => {
           
       
            createCard(book);

            removeCard();
            editBook();
           
            
    });    
}

function inputBookToArray() {
    
    clickAddCard()

    submitButton.addEventListener('click', () => {
        const titleValue = titleInput.value.trim();
        const authorValue = authorInput.value.trim();
        const pageNumValue = pageNumInput.value.trim();
        const checkBoxValue = checkBox.checked; 
        
        checkInput(titleValue, authorValue, pageNumValue, checkBoxValue);
      
    });
    
}







inputBookToArray();

closeInput();


function removeCard() {
    let removeButtons = document.querySelectorAll('.remove');
    

    removeButtons.forEach((button) =>{
        button.addEventListener('click', ()=> {
            const bookID = button.parentElement.parentElement.id;
            button.parentElement.parentElement.remove();
           
            myLibrary.forEach((book) => {
                if (book.title === bookID)
                myLibrary.splice(myLibrary.indexOf(book),1);
                console.log(myLibrary);
            });
        });
    });
}

function createCard(book) {
    let newCardElement = document.createElement('div')
    contentElement.appendChild(newCardElement);
    newCardElement.classList.add('card');
    newCardElement.classList.add(`book${myLibrary.indexOf(book)}`);
    
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const para3 = document.createElement('p');
    const para4 = document.createElement('p');
    const checkboxLabel = document.createElement('p');
    checkboxLabel.classList = 'checkboxLabel'
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.classList.add('checkbox');
    checkboxInput.setAttribute('id','cardCheckBox');
    checkboxLabel.textContent = 'Completed'
    checkboxInput.checked = book.status;
    
    
    const childTitle = document.createTextNode('Title: ' + book.title);
    const childAuthor = document.createTextNode('Author: ' + book.author);
    const childPageNum = document.createTextNode('Total No. of Pages: ' + book.pageNum);
    
    
    
    para1.appendChild(childTitle);
    para1.classList.add('cardTitle');
    para2.appendChild(childAuthor);
    para2.classList.add('cardAuthor');
    para3.appendChild(childPageNum);
    para3.classList.add('cardPageNum');
    

    newCardElement.appendChild(para1);
    newCardElement.appendChild(para2);
    newCardElement.appendChild(para3);
    newCardElement.appendChild(checkboxLabel);
    checkboxLabel.appendChild(para4);
    checkboxLabel.appendChild(checkboxInput);

    const removeButton = document.createElement('button');
    const editButton = document.createElement('button')
    const buttonsContainer = document.createElement('div')
    
    buttonsContainer.classList.add('buttons-container');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';

    newCardElement.appendChild(buttonsContainer);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(removeButton);
    
    
    newCardElement.setAttribute('id',book.title);
}


function closeInput() {
    let closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', ()=> {
        closeModal();
        formControls.forEach((input) => {
            input.classList.remove('error');
        });
        document.getElementById('form').classList.remove('fadeIn');
    });
}

function closeModal() {
    document.getElementById('form').reset();
    document.getElementById('bg-modal').style.visibility = 'hidden';
    document.getElementById('form').style.visibility = 'hidden';
    formControls.forEach((input) => {
        input.classList.remove('success');
    });
    document.getElementById('form').classList.remove('fadeIn');
}

function clickAddCard() {
    let addButton = document.querySelector('.add');
    addButton.addEventListener('click', ()=> {
        document.getElementById('bg-modal').style.visibility = 'visible';
        document.getElementById('form').style.visibility = 'visible';
        document.getElementById('form').classList.add('fadeIn');
    })
}


function checkInput (titleValue, authorValue, pageNumValue, checkBoxValue) {

    if (titleValue === "") {
        titleInput.parentElement.classList.add('error');
        
        
    }
    else {
        titleInput.parentElement.classList.remove('error');
        titleInput.parentElement.classList.add('success');
        
    }


    if (authorValue === "") {
        authorInput.parentElement.classList.add('error');
    }
    else {
        authorInput.parentElement.classList.remove('error');
        authorInput.parentElement.classList.add('success');
    }

    if (pageNumValue === "") {
        pageNumInput.parentElement.classList.add('error');
        pageNumError.textContent = 'Please provide missing input';
    }
    else if (isNaN(Number(pageNumValue))) {
        pageNumInput.parentElement.classList.add('error');
        pageNumError.textContent = 'Please provide a number';
    }
    else {
        pageNumInput.parentElement.classList.remove('error');
        pageNumInput.parentElement.classList.add('success');
    }

    

    if (titleValue !== "" && authorValue !== "" && (pageNumValue !== "" && !isNaN(Number(pageNumValue)))) {
        const newBook = new Book(titleValue, authorValue, pageNumValue, checkBoxValue);
        myLibrary.push(newBook);
   
    
        addBookToLibrary();
    
        closeModal();
    }
}

function editBook() {
    const editButtons = document.querySelectorAll('.edit');    
    editButtons.forEach((button) => {
        button.addEventListener('click', () => {
            
            let cardElement = button.parentElement.parentElement;
            let bookID = cardElement.id;
            let bookAuthor ='';
            let bookPageNum = '';
            let bookCompletion = false;
            
            myLibrary.forEach((book) => {
                if (book.title === bookID) {
                    bookAuthor = book.author;
                    bookPageNum = book.pageNum;
                    bookCompletion = book.status;
                }
            });


            document.getElementById('bg-modal').style.visibility = 'visible';
            document.getElementById('form').style.visibility = 'visible';
            document.getElementById('form').classList.add('fadeIn');

            document.querySelector('.header2').textContent = 'Edit Book'
            titleInput.setAttribute('value',bookID);

            authorInput

            






        //     myLibrary.forEach((book) => {
           
                



        });
    });
}

