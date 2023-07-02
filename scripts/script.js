const BASE_URL = 'https://rickandmortyapi.com/api';
let imgsContainer = document.querySelector('#all-imgs');
let pageNumInput = document.querySelector('#page-count-input');
let pageNumHeader = document.querySelector('#page-num');
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
		pageNumHeader.innerHTML = 'Page 1';

		updateImgContainer(filteredChars);
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
	if (prevLink != null) {
		try {
			const response = await fetch(prevLink);
			const data = await response.json();

			const characters = data.results;
			updateImgContainer(characters);
			prevLink = data.info.prev;
			nextLink = data.info.next;
			currentPage--;
			pageNumHeader.innerHTML = `Page ${currentPage}`;
		} catch (error) {
			console.log(error);
		}
	}
});

//Next Button Function
nextBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	if (nextLink != null) {
		try {
			const response = await fetch(nextLink);
			const data = await response.json();
			const nextCharacters = data.results;
			updateImgContainer(nextCharacters);
			nextLink = data.info.next;
			prevLink = data.info.prev;

			currentPage++;
			pageNumHeader.innerHTML = `Page ${currentPage}`;
		} catch (error) {
			console.log(error);
		}
	}
});

const updateImgContainer = (arr) => {
	imgsContainer.innerHTML = arr
		.map((char) => {
			return `<div class='img-container'>
	<img src='${char.image}'>
	<div class='img-card-info'>
		<p>${char.name}</p>
		<a href="../pages/detail.html?id=${char.id}">See Details</a>
	</div>
	</div>`;
		})
		.join('');
};
