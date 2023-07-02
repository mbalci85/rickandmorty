export let imgsContainer = document.querySelector('#all-imgs');

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
