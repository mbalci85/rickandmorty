const BASE_URL = 'https://rickandmortyapi.com/api/character';
const urlParam = new URLSearchParams(window.location.search);
const currentID = urlParam.get('id');
const main = document.querySelector('#main-char-container');
const imgContainer = document.createElement('div');
imgContainer.setAttribute('class', 'main-char');

main.appendChild(imgContainer);

const showMainChar = async () => {
	try {
		const response = await fetch(`${BASE_URL}/${currentID}`);
		const data = await response.json();

		console.log(data);

		imgContainer.innerHTML = `
            <img src='${data.image}'>
            <p class='char-info'>Name: ${data.name}</p>
            <p class='char-info'>Status: ${data.status}</p>
            <p class='char-info'>Species: ${data.species}</p>
            <p class='char-info'>Gender: ${data.gender}</p>
            `;
	} catch (error) {
		console.log(error);
	}
};

showMainChar();
