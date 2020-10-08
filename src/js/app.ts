// Get Qoute from API
const qouteUrl = 'https://type.fit/api/quotes';
const proxyurl = 'https://cors-anywhere.herokuapp.com/';

const qouteContainer = document.getElementById('qoute-container');
const qouteText = document.getElementById('qoute');
const qouteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQouteBtn = document.getElementById('new-qoute');
const loader = document.getElementById('loader');

interface Qoute {
	text: string;
	author: string;
}

function showLoadingSpinner() {
	loader.hidden = false;
	qouteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		qouteContainer.hidden = false;
		loader.hidden = true;
	}
}

async function getQoute(url: string) {
	showLoadingSpinner();
	const randomQouteNumber = Math.floor(Math.random() * 1000);
	try {
		const response = await fetch(url);
		const data: Qoute[] = await response.json();
		const textQ = data[randomQouteNumber].text;
		const authorQ = data[randomQouteNumber].author;

		qouteAuthor.innerText = authorQ ? authorQ : 'Unknown';
		if (textQ.length > 120) {
			qouteText.classList.add('long-qoute');
		}
		qouteText.innerText = textQ;

		removeLoadingSpinner();
	} catch (error) {
		getQoute(url);
		console.log('Whoops!! no qoute', error);
	}
}

function tweetQoute() {
	const qoute = qouteText.innerText;
	const author = qouteAuthor.innerText;
	const twitterUrl = `https://twitter.com/indent/tweet?text=${qoute} - ${author}`;

	window.open(twitterUrl), '_blank';
}

newQouteBtn.addEventListener('click', function () {
	getQoute(qouteUrl);
});
twitterBtn.addEventListener('click', tweetQoute);

// On Load
getQoute(qouteUrl);
