
// function for creating book data.
function createBookElement(bookName, authorName) {
    // Create the outer div with the class "bookData"
    const bookDataDiv = document.createElement('div');
    bookDataDiv.classList.add('bookData');

    const selectBookButton = document.createElement('button');
    selectBookButton.classList.add('selectBook');

    // Create the first child div with an image
    const imageDiv = document.createElement('div');
    const bookImage = document.createElement('img');
    bookImage.src = "../static/images/bookCover.png";
    bookImage.alt = '';
    bookImage.classList.add('bookImage');
    imageDiv.appendChild(bookImage);

    // Create the second child div with author information
    const authorDiv = document.createElement('div');
    const titleH5 = document.createElement('h5');
    titleH5.textContent = bookName;
    authorDiv.appendChild(titleH5);
    
    const authorH6 = document.createElement('h6');
    authorH6.textContent = authorName;
    authorDiv.appendChild(authorH6);

    selectBookButton.appendChild(imageDiv);
    selectBookButton.appendChild(authorDiv);

    let activeElementId = null;

    selectBookButton.addEventListener("click", function(){

        if (activeElementId) {
           // Remove the "active" id from the previously active element.
           document.getElementById(activeElementId).removeAttribute("id");
        }

        this.id = "active";

        // Update the activeElementId variable with the current element's id.
        activeElementId = this.id;

        // selectBookButton.classList.add('active');

        selectBook(bookName, authorName);
    });
    
    bookDataDiv.appendChild(selectBookButton);

    const possition = document.getElementsByClassName('bookName');

    for (const position of possition) {
        position.appendChild(bookDataDiv);
    }
}

//for adding new Book.
function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    const inputPopUp = document.getElementById('modal-content-addBook');
    inputPopUp.style.display = 'block';
    const loginContent = document.getElementById('modal-content-login');
    loginContent.style.display = 'none';

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            loginContent.style.display = 'block';
        }
    });
}

//for open login pop-up.
function openLoginPopup() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    const loginGooglePopUp = document.getElementById('modal-content-login');
    loginGooglePopUp.style.display = 'block';
    const addBookContent = document.getElementById('modal-content-addBook');
    addBookContent.style.display = 'none';

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            addBookContent.style.display = 'block';
        }
    });
}

function submitData() {
    if (input2.value === '' || input3.value === '') {
        alert('Both fields are required.');
    }
    else {
        const input2 = document.getElementById('input2');
        const input3 = document.getElementById('input3');
    
        createBookElement(input2.value, input3.value);
    
        input2.value = '';
        input3.value = '';
    
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

}

//create function that show the book at right head top header when we select the book.
function selectBook(a,b){
    const bookNamee = document.getElementById('a');
    // console.log(bookNamee);
    // const bookAuthor = document.getElementsByClassName('authorHeader');
    const bookAuthor = document.getElementById('b');
    // console.log(bookAuthor);
    const check1 = bookNamee.innerHTML;
    console.log(check1)
    console.log(a)
    if(check1===a) $('#parent > div').remove();
    else{
        bookNamee.innerHTML = a;
        bookAuthor.innerHTML = b;
    }

    // console.log(bookAuthor);

}

function querySelect(selectedQuery){
    const queries = document.getElementById('shortCuts');
    queries.style.display = 'none';

    const questionInput = document.getElementById("textQuery");
    questionInput.value = selectedQuery;

    // return 
}

const QueryButton = document.getElementById('qButton');

// QueryButton.addEventListener('click', function(){
//     const inputText = document.getElementById('textQuery'); // 
//     if(inputText.value === ''){
//         alert('write your query first');        
//     }
//     else if(inputText.value !== ''){
//         querySelect();
//         conversation();        
//     }
//     inputText.value = ""; // 
// });

// idk


async function postData(url = "", data = {}) { 
    const response = await fetch(url, {
      method: "POST", headers: {
        "Content-Type": "application/json", 
      }, body: JSON.stringify(data),  
    });
    return response.json(); 
  }
  
// QueryButton.addEventListener('click', async ()=>{ 
//     const questionInput = document.getElementById("textQuery");
    

//     if(questionInput.value === ''){
//         alert('write your query first');        
//     }

//     else if(questionInput.value !== ''){
//         // querySelect();
        
//         const userCHAT = document.createElement('div');
//         userCHAT.classList.add('userChat');
//         const aiREPLY = document.createElement('div');
//         aiREPLY.classList.add('aiReply');

//         const userIMAGE = document.createElement('img');
//         userIMAGE.classList.add('userImage');
//         userIMAGE.src="../static/images/bookCover.png";

//         const userQUESTION = document.createElement('p');
//         userQUESTION.classList.add('userQuestion');

//         userQUESTION.innerText = questionInput.value;
    
//         userCHAT.appendChild(userIMAGE);
//         userCHAT.appendChild(userQUESTION);

//         const aiIMAGE = document.createElement('img');
//         aiIMAGE.classList.add('aiImage');
//         // add src 
//         aiIMAGE.src="../static/images/login.png";

//         const aiANSWER = document.createElement('p');
//         aiANSWER.classList.add('aiAnswer');
//         // ai answer
//         var bookDetail = document.getElementById("active")

//         var bookName = bookDetail.querySelector("h5").textContent;
//         var author = bookDetail.querySelector("h6").textContent;
          
//         console.log("Book Name: " + bookName);
//         console.log("Author: " + author);

        
        
//         const response = await postData("/api", { "question": questionInput.value , "bookName": bookName , "author" : author});
//         // const data = await response.json(); // Parse the response JSON
//         const ans = response.answer.replace(/<br>/g, '');
//         aiANSWER.innerText = ans; // Access the 'answer' property
        
        
//         console.log(aiANSWER)


//         aiREPLY.appendChild(aiIMAGE);
//         aiREPLY.appendChild(aiANSWER);

//         const ChatData = document.getElementsByClassName('chatting');

//         for(const chat of ChatData){
//             chat.appendChild(userCHAT);
//             chat.appendChild(aiREPLY);
//         }
//     }

//     questionInput.value = ""; // 

// })

QueryButton.addEventListener('click', async () => {
    const questionInput = document.getElementById("textQuery");
    var bookName = document.getElementById("a").innerHTML;
    var author = document.getElementById("b").innerHTML;

    
    if (questionInput.value === '') {
        alert('Write your query first');
    } 
    else if(bookName==="Book Name" || author==="Author name"){
        alert("Select or add the book");
    }
    else if (questionInput.value !== '') {



        // document.getElementById("textQuery").value="";
        // Show a loading message


        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('loadingMessage');
        loadingMessage.innerText = 'Loading...';
        const ChatData = document.getElementsByClassName('chatting');
        for (const chat of ChatData) {
            chat.appendChild(loadingMessage);
        }

        const userCHAT = document.createElement('div');
        userCHAT.classList.add('userChat');
        const aiREPLY = document.createElement('div');
        aiREPLY.classList.add('aiReply');

        const userIMAGE = document.createElement('img');
        userIMAGE.classList.add('userImage');
        userIMAGE.src = "../static/images/bookCover.png";

        const userQUESTION = document.createElement('p');
        userQUESTION.classList.add('userQuestion');
        userQUESTION.innerText = questionInput.value;

        userCHAT.appendChild(userIMAGE);
        userCHAT.appendChild(userQUESTION);

        const aiIMAGE = document.createElement('img');
        aiIMAGE.classList.add('aiImage');
        aiIMAGE.src = "../static/images/login.png";

        const aiANSWER = document.createElement('p');
        aiANSWER.classList.add('aiAnswer');

        // var bookName = document.getElementById("a").innerHTML;
        // var author = document.getElementById("b").innerHTML;

        // if(bookName==="Book Name" || author==="Author name"){
        //     alert("Select or add the book");
        //     return;
        // }

        console.log("Book Name: " + bookName);
        console.log("Author: " + author);

        const response = await postData("/api", { "question": questionInput.value, "bookName": bookName, "author": author });
        const ans = response.answer.replace(/<br>/g, '');
        aiANSWER.innerText = ans;

        aiREPLY.appendChild(aiIMAGE);
        aiREPLY.appendChild(aiANSWER);

        // Remove the loading message
        // for (const chat of ChatData) {
        //     chat.removeChild(loadingMessage);
        //     chat.appendChild(userCHAT);
        //     chat.appendChild(aiREPLY);
        // }
        /*  from here */
         // Show the user's message and loading message
         ChatData[0].appendChild(userCHAT);
         ChatData[0].appendChild(loadingMessage);
 
         // Simulate a delay to mimic the AI's response time
         setTimeout(() => {
             // Remove the loading message and show the AI's response
             ChatData[0].removeChild(loadingMessage);
             ChatData[0].appendChild(aiREPLY);
         }, 500); // You can adjust the delay time as needed
 
         questionInput.value = "";

         /*  to here */
    }

    // questionInput.value = "";
})


//when user sign in the account then
function nowUserLogedIn(){
    const signInButton = document.getElementsByClassName('signIn');
    
    for (let i = 0; i < signInButton.length; i++) {
        signInButton[i].style.display = 'none';
    }

    const userLoginDiv = document.getElementsByClassName('userGmail');

    for (let i=0; i<userLoginDiv.length; i++){
        userLoginDiv[i].style.display = 'flex';
    }

    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

//when user press drop down button then
let count = 0;
function userPressDropDown(){
    count = count + 1;
    const dropDownDiv = document.getElementById('dropDown');
    const bookNameDiv = document.getElementById('bookNameDiv');
    if(count%2 == 0){
        dropDownDiv.style.display = 'none';
        bookNameDiv.style.display = 'block';
        count = 0;
    }
    else{
        dropDownDiv.style.display = 'block';
        bookNameDiv.style.display = 'none';        
    }
    
}

//when user click LogOut button
function userLogOut(){
    const signInButton = document.getElementsByClassName('signIn');
    
    for (let i = 0; i < signInButton.length; i++) {
        signInButton[i].style.display = 'block';
    }

    const userLoginDiv = document.getElementsByClassName('userGmail');

    for (let i=0; i<userLoginDiv.length; i++){
        userLoginDiv[i].style.display = 'none';
    }

    const dropDownDiv = document.getElementById('dropDown');
    dropDownDiv.style.display = 'none';

    const bookNameDiv = document.getElementById('bookNameDiv');
    bookNameDiv.style.display = 'block';
    count = 0;
}

// document.getElementById('loginIdAnchor').addEventListener('click', function(event) {
//     // if (event.target === modal) {
//     //     modal.style.display = 'none';
//     //     addBookContent.style.display = 'block';
//     // }

// });