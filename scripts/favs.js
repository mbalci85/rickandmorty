const BASE_URL = 'https://rickandmortyapi.com/api/character/';
const favItems = JSON.parse(localStorage.getItem('fav-items'));
const favItemsContainer = document.querySelector('#fav-items-container');

const fetchItemDetails = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}${id}`);
		const data = await response.json();

		const favContainer = document.createElement('div');
		favContainer.setAttribute('class', 'fav-item-card');
		const favItemCard = `
        <img src="${data.image}"/>
        <p>Name: ${data.name}</p>
        <p>Status: ${data.status}</p>
        <p>Species: ${data.species}</p>
        <p>Gender: ${data.gender}</p>
        <button data-id="${id}" onclick='removeFav(${id})'>Remove</button>
       `;

		favContainer.innerHTML = favItemCard;

		favItemsContainer.appendChild(favContainer);
	} catch (error) {
		console.log(error);
	}
};

Promise.all(favItems.map((item) => fetchItemDetails(item)))
	.then((items) => {})
	.catch((error) => {
		console.log(error);
	});

const removeFav = (id) => {
	const cardToRemove = document
		.querySelector(`[data-id="${id}"]`)
		.closest('.fav-item-card');
	cardToRemove.remove();
	updatedFavs = JSON.parse(localStorage.getItem('fav-items')).filter(
		(item) => item != id
	);
	localStorage.setItem('fav-items', JSON.stringify(updatedFavs));
};
