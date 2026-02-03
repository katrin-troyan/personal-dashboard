import { quotes } from "./quotes-data.js";

const queryText = document.querySelector(".quote-text");
const queryAuthor = document.querySelector(".quote-author");
const refreshButton = document.querySelector(".quote-refresh");

async function fetchQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  queryText.textContent = quote.text;
  queryAuthor.textContent = quote.author;
}
refreshButton.addEventListener("click", () => {
  fetchQuote();
});
fetchQuote();
