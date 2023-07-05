import {
	imgsContainer,
	pageNumHeader,
	domElements,
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

		domElements.setNextLink(data.info.next);
		domElements.setPrevLink(data.info.prev);

		pageNumInput.placeholder = `Up to ${pageCount}`;
		pageNumHeader.innerHTML = `Page ${pageNum}`;
		domElements.setCurrentPage(pageNum);
		searchByName.value = '';

		updateImgContainer(characters);
	} catch (error) {
		console.log(error);
	}
};
getAllChars();

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
		pageNumHeader.innerHTML = `Page ${(domElements.currentPage = 1)}`;
		updateImgContainer(filteredChars);
		domElements.setNextLink(data.info.next);
		domElements.setPrevLink(data.info.prev);
	} catch (error) {
		console.log(error);
		imgsContainer.innerHTML = '';
		pageNumInput.placeholder = '';
		pageNumHeader.innerHTML = '';
	}
});

//Previous Page Function
prevBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (domElements.prevLink != null) {
		handlePageNavigation(domElements.prevLink);
		domElements.currentPage--;
	}
});

//Next Button Function
nextBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (domElements.nextLink != null) {
		handlePageNavigation(domElements.nextLink);
		domElements.currentPage++;
	}
});

//Add to Fav Functionality

const addToFav = (id) => {
	const favItems = JSON.parse(localStorage.getItem('fav-items'));
	if (!favItems.includes(id)) {
		favItems.push(id);
		localStorage.setItem('fav-items', JSON.stringify(favItems));
		document.querySelector(`[data-id="${id}"]`).style.color = 'red';
	} else {
		const newItems = favItems.filter((item) => item != id);
		localStorage.setItem('fav-items', JSON.stringify(newItems));
		document.querySelector(`[data-id="${id}"]`).style.color = 'black';
	}
};

imgsContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('fa-heart')) {
		const id = event.target.dataset.id;
		addToFav(id);
	}
});
