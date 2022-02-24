const nextQuoteBtn = document.getElementById('next-button');
const quoteDes = document.getElementById('quote-container__quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const loaderMain = document.getElementById('loader-main');
const quoteContainer = document.getElementById('quote-container');

const randomQuoteHandler = event => {
    loaderMain.style.display = 'block';
    quoteContainer.style.display = 'none';

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
        quoteAuthor.textContent = selectedRandomQuote.author || 'Unknown';
        loaderMain.style.display = 'none';
        quoteContainer.style.display = 'block';
    })
         // COVERED CORS ERRORS + JSON PARESE ERROR AND ANTOHER WAY TO GET DATA USING SIDE EFFECT THROGH fetch() api this time !
         
        // .catch(err => {
        //     console.log(err);
        //     loaderMain.style.display = 'none';
        //     quoteContainer.style.display = 'block';
        // });
    
        // const getDynamicQuoteHandler = async () => {
        //     const corsUrl = 'https://cors-anywhere.herokuapp.com/';      // cors-violation solution, if not worked then open this link once in your browser atleast !
        //     const dynQuoteUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        
        //     const response = await fetch(corsUrl + dynQuoteUrl);
        
        //     try {
        //         if(!response.ok) {
        //             const errRes = await response.json();
        //             throw new Error(errRes);
        //         }
        
        //         const responseData = await response.json();
        
        //         console.log(responseData);
        //     }catch(err) {
        //         console.log('Oops, Failed To fetch qoute from api, Try again: ', err + ' ...!');
        //         getDynamicQuoteHandler();
        //     }
        // }
        
        // getDynamicQuoteHandler();
        
}

const tweetHandler = async event => {
    const quote = quoteDes.textContent;
    const author = quoteAuthor.textContent || 'Unknown';

    const url = encodeURI(`https://twitter.com/intent/tweet?text=${quote}\r\r\r~${author}`);

    open(url.trim(), '_blank');
    // location.assign(url.trim()); // for same page redirection...
}

nextQuoteBtn.addEventListener('click', randomQuoteHandler);
twitterBtn.addEventListener('click', tweetHandler);