const BASE_URL = 'https://rickandmortyapi.com/api';
const imgsContainer = document.querySelector('#all-imgs');
const pageNumInput = document.querySelector('#page-count-input');

const getAllChars = async () => {
	try {
		const response = await fetch(`${BASE_URL}/character/?page=${pageNum}`);
		const data = await response.json();

		const characters = data.results;
		const pageCount = data.info.pages;

		pageNumInput.placeholder = `Up to ${pageCount}`;

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
let pageNum;
pageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	pageNum = pageNumInput.value;

	pageNumInput.value = '';
	getAllChars();
});

getAllChars();
