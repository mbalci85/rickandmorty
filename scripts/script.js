const BASE_URL = 'https://rickandmortyapi.com/api';
const imgsContainer = document.querySelector('#all-imgs');

const getAllChars = async () => {
	try {
		const response = await fetch(`${BASE_URL}/character`);
		const data = await response.json();
		console.log(data.results);

		const characters = data.results;

		imgsContainer.innerHTML = characters
			.map((char) => {
				return `<div class='img-container'>
			<img src='${char.image}'>
			<p>${char.name}</p>
			<a href="../pages/detail.html?id=${char.id}">See Details</a>
			</div>`;
			})
			.join('');
		console.log(imgsContainer.innerHTML);
	} catch (error) {
		console.log(error);
	}
};

getAllChars();