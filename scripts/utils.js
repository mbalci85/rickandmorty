export let imgsContainer = document.querySelector('#all-imgs');
export let pageNumHeader = document.querySelector('#page-num');

export const domElements = {
	nextLink: null,
	prevLink: null,
	currentPage: 1,
	setNextLink: function (link) {
		this.nextLink = link;
	},
	setPrevLink: function (link) {
		this.prevLink = link;
	},
	setCurrentPage: function (page) {
		this.currentPage = page;
	},
};

//updating list of chars when next, prev, search, showall chars
export const updateImgContainer = (arr) => {
	const favItems = JSON.parse(localStorage.getItem('fav-items'));
	if (favItems === null) {
		localStorage.setItem('fav-items', JSON.stringify([]));
	}
	imgsContainer.innerHTML = arr
		.map((char) => {
			return `<div class='img-container'>
	<img src='${char.image}'>
	<div class='img-card-info'>
		<p>${char.name}</p>
		<i id='add-fav' style='color:${
			favItems.includes(char.id.toString()) ? 'red' : 'black'
		}' data-id="${char.id}" class="fas fa-heart"></i>

		<a href="../pages/detail.html?id=${char.id}">See Details</a>
	</div>
	</div>`;
		})
		.join('');
};

//Utility func to handle page navigation
export const handlePageNavigation = async (link) => {
	try {
		const response = await fetch(link);
		const data = await response.json();
		const characters = data.results;
		updateImgContainer(characters);
		domElements.setNextLink(data.info.next);
		domElements.setPrevLink(data.info.prev);
		pageNumHeader.innerHTML = `Page ${domElements.currentPage}`;
	} catch (error) {
		console.log(error);
	}
};
