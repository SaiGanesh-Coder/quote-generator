const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
let apiQuotes = [];

function outputStringTillCharacter(inputString, specificCharacter) {
    const index = inputString.indexOf(specificCharacter);
    if (index !== -1) {
        return inputString.substring(0, index);
    }
    return inputString; // Return the entire string if the character is not found
}

//Show New Quote
function newQuote(){
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank and replace it with 'Unkown'
    if(!outputStringTillCharacter(quote.author,',')){
        authorText.textContent = 'Unknown';
    }else{
        authorText.innerText = outputStringTillCharacter(quote.author,',');
    }
    // Check Quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quote From API
async function getQuote(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes/';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    }catch(error){
        // Catch Error Here
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();