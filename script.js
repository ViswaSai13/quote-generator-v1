const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quoteObj = {};

// Show Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // If Author field is blank replace it with 'Unknown'
  if (!quoteObj.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quoteObj.author;
  }
  // Check Quote length to determine styling (long quote or short quote)
  if (quoteObj.quote.length > 115) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quoteObj.quote;
  removeLoadingSpinner();
}

// Get Quotes From API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://free-quotes-api.herokuapp.com/";
  try {
    const response = await fetch(apiUrl);
    quoteObj = await response.json();
    newQuote();
  } catch (error) {
    newQuote();
  }
}

// Tweet the quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
