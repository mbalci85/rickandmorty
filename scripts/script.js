import { updateImgContainer, imgsContainer } from './utils.js';

const BASE_URL = 'https://rickandmortyapi.com/api';
let pageNumHeader = document.querySelector('#page-num');
let pageNumInput = document.querySelector('#page-count-input');
let searchByName = document.querySelector('#search');
let prevBtn = document.querySelector('#prev-btn');
let nextBtn = document.querySelector('#next-btn');
let pageCount;
let nextLink;
let prevLink;
let currentPage = 1;

const getAllChars = async (pageNum = 1) => {
	try {
		const response = await fetch(`${BASE_URL}/character/?page=${pageNum}`);
		const data = await response.json();

		const characters = data.results;
		pageCount = data.info.pages;

		nextLink = data.info.next;
		prevLink = data.info.prev;

		pageNumInput.placeholder = `Up to ${pageCount}`;
		pageNumHeader.innerHTML = `Page ${pageNum}`;
		currentPage = pageNum;
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
		pageNumHeader.innerHTML = `Page ${(currentPage = 1)}`;
		updateImgContainer(filteredChars);
		nextLink = data.info.next;
		prevLink = data.info.prev;

		console.log(nextLink);
	} catch (error) {
		console.log(error);
		imgsContainer.innerHTML = '';
		pageNumInput.placeholder = '';
		pageNumHeader.innerHTML = '';
	}
});

getAllChars();

//Utility func to handle page navigation
export const handlePageNavigation = async (link) => {
	try {
		const response = await fetch(link);
		const data = await response.json();
		const characters = data.results;
		updateImgContainer(characters);
		nextLink = data.info.next;
		prevLink = data.info.prev;
		pageNumHeader.innerHTML = `Page ${currentPage}`;
	} catch (error) {
		console.log(error);
	}
};

//Previous Page Function
prevBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (prevLink != null) {
		handlePageNavigation(prevLink);
		currentPage--;
	}
});

//Next Button Function
nextBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (nextLink != null) {
		handlePageNavigation(nextLink);
		currentPage++;
	}
});
