//Variables used for state.
let localNewsData = [];     //Stores the most recently fetched info from the API call to reduce redundant API calls.
let currentArticle = 0;
let numWords = 0;

//Call Google News API on page load.
callNewsApi();


//Google News API Call
function callNewsApi() {

    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6ec6cf3aa6msh04ad88a208dda4ap1e0104jsn10035a179610',
            'X-RapidAPI-Host': 'google-news1.p.rapidapi.com'
        }
    };
    
    fetch('https://google-news1.p.rapidapi.com/top-headlines?country=US&lang=en&limit=25&media=true', options2).then(
        (resp) => {return resp.json();}).then (
        (data) => {  readyNewsData(data);
            console.log(data);
    });

}

//WordsAPI API Call
function callWordsApi() {
    
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': '6ec6cf3aa6msh04ad88a208dda4ap1e0104jsn10035a179610',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
    };
    
fetch('https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf', options).then(
    (response) => {response.json();}).then(
        (response) => { //TODO: Add function call/stuff here.
            console.log(response);
    });
}

//Takes in the response from the Google News API
function readyNewsData(newsData) {

    //Make a local array containing the api data.
    localNewsData = newsData;

    document.getElementById("news-title").textContent = localNewsData.articles[0].title;

    //document.getElementById("news-description").textContent = localNewsData.articles[0].description;

}

//This function changes the article based on which button is clicked. This is determined by the event parameter
//passed in by the event listener on said buttons.
function changeArticle(event) {

    if (event.currentTarget.id == "next-article") {
        currentArticle++;
    }
    
    if (event.currentTarget.id == "previous-article" && currentArticle > 0) {
        currentArticle--;
    }
    
    document.getElementById("news-title").textContent = localNewsData.articles[currentArticle].title;
    //document.getElementById("news-description").textContent = localNewsData.articles[currentArticle].description;

    divideDescription();

}

//Sets date at the top of the page.
const date = document.getElementById('date');

date.innerText = moment().format("dddd, MMMM Do YYYY");


//Event Listeners for Buttons
document.getElementById("next-article").addEventListener("click", changeArticle);
document.getElementById("previous-article").addEventListener("click", changeArticle);


//Create p elements in HTML
function divideDescription() {

    let wordArray = [];

    //Gets the description of the current article.
    //TODO: Change this to based on the current article displayed.
    let newsDesc = localNewsData.articles[1].description;

    //
    let newsDescLength = newsDesc.split(" ").length;

    wordArray = newsDesc.split(" ");
    console.log(wordArray);
    
    let theParent = document.getElementById("word-list");

    for (let i = 0; i < newsDescLength; i++) {
       
        //Create a new p element with an id == i
        let newEl = document.createElement("p");
        newEl.setAttribute("id", i);

        newEl.innerHTML = wordArray[i];

        theParent.appendChild(newEl);

    }

    addWordEventListeners();

}

//This function adds event listeners to each word in the text so that a definition may be grabbed from the Words API.
function addWordEventListeners() {

    //Iterate through the number of words which determines the highest ID #. Add an event listener to each ID.
    for(let i = 0; i < numWords; i++) {
        document.getElementById(i).addEventListener("click", getWordDef);
    }

}

//TODO: When a new article is pulled we must remove all the current event listeners before we can add them to a new one.
//NOTE: Might be able to get away without doing this every time.
function removeWordEventListeners() {
    
}

//TODO: This function will get the definition of a word from the WordsAPI.
function getWordDef(event) {

    let word;

    console.log("Word definition grabbed.");

    //return word;

}