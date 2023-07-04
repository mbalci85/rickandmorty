export let imgsContainer = document.querySelector('#all-imgs');
export let pageNumHeader = document.querySelector('#page-num');

export const DOMElements = {
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
	imgsContainer.innerHTML = arr
		.map((char) => {
			return `<div class='img-container'>
	<img src='${char.image}'>
	<div class='img-card-info'>
		<p>${char.name}</p>
		<i id='add-fav' data-id="${char.id}" class="fas fa-heart"></i>

		<a href="../pages/detail.html?id=${char.id}">See Details</a>
	</div>
	</div>`;
		})
		.join('');
};

const addToFav = (id) => {
	console.log(id);
};

imgsContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('fa-heart')) {
		const id = event.target.dataset.id;
		addToFav(id);
	}
});

//Utility func to handle page navigation
export const handlePageNavigation = async (link) => {
	try {
		const response = await fetch(link);
		const data = await response.json();
		const characters = data.results;
		updateImgContainer(characters);
		DOMElements.setNextLink(data.info.next);
		DOMElements.setPrevLink(data.info.prev);
		pageNumHeader.innerHTML = `Page ${DOMElements.currentPage}`;
	} catch (error) {
		console.log(error);
	}
};
