const BASE_URL = 'https://rickandmortyapi.com/api';
const imgsContainer = document.querySelector('#all-imgs');
const pageNumInput = document.querySelector('#page-count-input');
const pageNumHeader = document.querySelector('#page-num');
const searchByName = document.querySelector('#search');
let pageCount;

const getAllChars = async (pageNum) => {
	try {
		const response = await fetch(`${BASE_URL}/character/?page=${pageNum}`);
		const data = await response.json();

		const characters = data.results;
		pageCount = data.info.pages;

		pageNumInput.placeholder = `Up to ${pageCount}`;
		pageNumHeader.innerHTML = `Page ${pageNum}`;
		searchByName.value = '';

		imgsContainer.innerHTML = characters
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
	} catch (error) {
		console.log(error);
	}
};

const pageForm = document.querySelector('#go-to-page');

pageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	getAllChars(pageNumInput.value);
	pageNumInput.value = '';
});

searchByName.addEventListener('input', async (e) => {
	try {
		const response = await fetch(`${BASE_URL}/character/?name=${e.target.value}`);
		const data = await response.json();
		const filteredChars = data.results;
		pageCount = data.info.pages;
		imgsContainer.innerHTML = '';
		pageNumInput.placeholder = `Up to ${pageCount}`;

		imgsContainer.innerHTML = filteredChars
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
	} catch (error) {
		console.log(error);
		imgsContainer.innerHTML = '';
		pageNumInput.placeholder = '';
	}
});

getAllChars(1);
