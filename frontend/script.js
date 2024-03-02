const apiUrl = "http://localhost:4000";

document.addEventListener("DOMContentLoaded", () => {
  const quoteList = document.getElementById("quoteList");
  const addQuoteForm = document.getElementById("addQuoteForm");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  // Function to fetch quotes from API and display them
  const fetchQuotes = async () => {
    quoteList.innerHTML = "";
    const response = await fetch(`${apiUrl}/quotes`);
    const quotes = await response.json();
    quotes.forEach((quote) => {
      const quoteDiv = document.createElement("div");
      quoteDiv.classList.add("quote");
      quoteDiv.innerHTML = `<p>"${quote.text}" - ${quote.author}</p>`;
      quoteList.appendChild(quoteDiv);
    });
  };

  // Function to add a new quote
  const addQuote = async (text, author) => {
    const response = await fetch(`${apiUrl}/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, author }),
    });
    const newQuote = await response.json();
    console.log("New Quote:", newQuote);
    fetchQuotes(); // Refresh the quote list after adding a new quote
  };

  // Event listener for form submission
  addQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = quoteText.value.trim();
    const author = quoteAuthor?.value?.trim();
    if (text && author) {
      addQuote(text, author);
      quoteText.value = "";
      quoteAuthor.value = "";
    }
  });

  // Initial fetch of quotes
  fetchQuotes();
});
