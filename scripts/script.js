import {
	imgsContainer,
	pageNumHeader,
	DOMElements,
	updateImgContainer,
	handlePageNavigation,
} from './utils.js';

const BASE_URL = 'https://rickandmortyapi.com/api';

let pageNumInput = document.querySelector('#page-count-input');
let searchByName = document.querySelector('#search');
let prevBtn = document.querySelector('#prev-btn');
let nextBtn = document.querySelector('#next-btn');
let pageCount;

const getAllChars = async (pageNum = 1) => {
	try {
		const response = await fetch(`${BASE_URL}/character/?page=${pageNum}`);
		const data = await response.json();

		const characters = data.results;
		pageCount = data.info.pages;

		DOMElements.setNextLink(data.info.next);
		DOMElements.setPrevLink(data.info.prev);

		pageNumInput.placeholder = `Up to ${pageCount}`;
		pageNumHeader.innerHTML = `Page ${pageNum}`;
		DOMElements.setCurrentPage(pageNum);
		searchByName.value = '';

		updateImgContainer(characters);
	} catch (error) {
		console.log(error);
	}
};

//Go to Page Function
const pageForm = document.querySelector('#go-to-page');

pageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	getAllChars(pageNumInput.value);
	pageNumInput.value = '';
});

//Search by Name Function
searchByName.addEventListener('input', async (e) => {
	try {
		const response = await fetch(`${BASE_URL}/character/?name=${e.target.value}`);
		const data = await response.json();
		const filteredChars = data.results;
		pageCount = data.info.pages;
		pageNumInput.placeholder = `Up to ${pageCount}`;
		pageNumHeader.innerHTML = `Page ${(DOMElements.currentPage = 1)}`;
		updateImgContainer(filteredChars);
		DOMElements.setNextLink(data.info.next);
		DOMElements.setPrevLink(data.info.prev);
	} catch (error) {
		console.log(error);
		imgsContainer.innerHTML = '';
		pageNumInput.placeholder = '';
		pageNumHeader.innerHTML = '';
	}
});

getAllChars();

//Previous Page Function
prevBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (DOMElements.prevLink != null) {
		handlePageNavigation(DOMElements.prevLink);
		DOMElements.currentPage--;
	}
});

//Next Button Function
nextBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (DOMElements.nextLink != null) {
		handlePageNavigation(DOMElements.nextLink);
		DOMElements.currentPage++;
	}
});

const addToFav = () => {
	console.log('hello');
};
