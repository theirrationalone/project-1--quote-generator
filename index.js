const nextQuoteBtn = document.getElementById('next-button');
const quoteDes = document.getElementById('quote-container__quote');
const quoteAuthor = document.getElementById('author');

const randomQuoteHandler = event => {
    const xhr = new XMLHttpRequest();
    
    const quoteRequest = new Promise((resolve, reject) => {
        xhr.open('GET', 'https://type.fit/api/quotes');
        xhr.send();
        
        xhr.onload = event => {
            return resolve(xhr.response);
        }

        xhr.onerror = errEvent => {
            return reject('Something went wrong, Check your Api or internet connection and then try again !');
        }
    });

    quoteRequest.then(res => {
        const quotes = JSON.parse(res);
        const quotesLength = quotes.length;
        const randomQuoteIndex = Math.floor(Math.random() * quotesLength);
        const selectedRandomQuote = quotes[randomQuoteIndex];
        quoteDes.textContent = selectedRandomQuote.text;
        quoteAuthor.textContent = selectedRandomQuote.author;
    })
    .catch(err => {
        console.log(err);
    })
}

nextQuoteBtn.addEventListener('click', randomQuoteHandler);