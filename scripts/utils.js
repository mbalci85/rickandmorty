// Export a function to retrieve DOM element variables
export function getDOMElements() {
	let imgsContainer = document.querySelector('#all-imgs');
	let pageNumHeader = document.querySelector('#page-num');
	let nextLink;
	let prevLink;
	let currentPage = 1;

	return { imgsContainer, pageNumHeader, nextLink, prevLink, currentPage };
}

//updating list of chars when next, prev, search, showall chars
export const updateImgContainer = (arr) => {
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
		console.log(currentPage);
	} catch (error) {
		console.log(error);
	}
};
