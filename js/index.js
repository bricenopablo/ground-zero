'use strict';

// Variables
let products = [];

// Variables referentes elementos del HTML
const CAROUSEL = document.querySelector('#carrusel');
const GALLERY = document.querySelector('.art-gallery__images');
const SEARCH = document.querySelector('#search');
const MODALS = document.querySelector('#modals');
const FILTERS = document.getElementsByClassName('filter');
const FILTER_ACTIVE = document.querySelector('.filter.active');

// Fetch products function
const fetchProducts = async () => {
	try {
		const res = await fetch('./js/products.json'); // Se obtienen los datos con fetch
		const data = await res.json();

		products = data; // La variable products se iguala con los datos obtenidos
	} catch (err) {
		console.error(err);
	}
};

// populateing carousel function
const populateCarousel = async () => {
	// Se filtran los productos destacados
	const featured_items = products.filter((item) => item.featured);

	// Se rellena el carrusel con cada producto destacado
	featured_items.forEach((item, i) => {
		CAROUSEL.children[0].innerHTML += `<button type="button" data-bs-target="#carrusel" data-bs-slide-to="${i}" aria-current="true" aria-label="Slide ${
			i + 1
		}"></button>`;
		CAROUSEL.children[1].innerHTML += `
    <div class="carousel-item">
      <img src="${item.pictures[0]}" class="d-block w-100" alt="${item.product_name}" />
      <div class="view-more">
        <div class="view-more__details">
          <h3 class="view-more__author">${item.artist_name}</h3>
          <p class="view-more__piece">${item.product_name}</p>
        </div>
        <button data-bs-toggle="modal" data-bs-target="#${item.product_id}" class="view-more__btn">Conocer</button>
      </div>
    </div>
    `;
		MODALS.innerHTML += `
    <div class="modal" id="${item.product_id}">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-info">
						<h4 class="text-center">${item.product_name}</h4>
						<p class="model-item-quote">"${item.description}"</p>
						<p class="modal-item-price"><b>Precio:</b> ${
							item.price ? '$' + item.price.toLocaleString() : 'Gratis'
						}</p>
					</div>
					<div class="modal-desc">
						<img src="${item.pictures[0]}" alt="${item.product_name}" />
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">+</button>
						<div class="view-more">
							<h4 class="text-center">Descripción</h4>
							<ul>
								<li><b>Nombre:</b> ${item.product_name}</li>
								<li><b>Autor:</b> ${item.artist_name}</li>
								<li><b>Historia:</b> ${item.history}</li>
								<li><b>Técnica usada:</b> ${item.technique_used}</li>
								<li><b>Categoría:</b> ${
									item.category.substr(0, 1).toUpperCase() +
									item.category.substr(1, item.category.length)
								}</li>
							</ul>
						</div>
					</div>
        </div>
      </div>
    </div>
    `;
	});

	// Se añaden las clases activas al primer elemento del carrusel
	CAROUSEL.children[0].children[0].classList.add('active');
	CAROUSEL.children[1].children[0].classList.add('active');
};

const populateGallery = (category, isSearch) => {
	GALLERY.style.opacity = 0;

	setTimeout(() => {
		GALLERY.innerHTML = '';

		let filter = [];

		if (category === '' || category === 'todas') {
			filter = products.filter((item) => !item.featured);
			FILTERS[1].classList.add('active');
		} else {
			filter = products.filter(
				(item) => !item.featured && item.category === category
			);
		}

		if (category !== '' && isSearch) {
			filter = products.filter(
				(item) =>
					item.artist_name
						.toLowerCase()
						.includes(String(category).toLowerCase()) ||
					item.product_name
						.toLowerCase()
						.includes(String(category).toLowerCase())
			);
		}

		filter.forEach((item) => {
			GALLERY.innerHTML += `
    <div class="gallery__item">
      <img src="${item.pictures[0]}" alt="${item.product_name}" />
			<div class="view-more"><p>${item.product_name}</p><p>${item.artist_name}</p></div>
    </div>
    `;
		});
		GALLERY.style.opacity = 1;
	}, 600);
};

const removeActiveFilter = () => {
	for (let i = 0; i < FILTERS.length; i++) {
		FILTERS[i].classList.remove('active');
	}
};

fetchProducts().then(() => {
	populateCarousel();
	populateGallery('');
});

// Events listeners
for (let i = 0; i < FILTERS.length; i++) {
	FILTERS[i].addEventListener('click', function () {
		removeActiveFilter();
		this.classList.add('active');
		populateGallery(this.innerHTML.toLowerCase());
		SEARCH.children[1].value = '';
	});
}

SEARCH.addEventListener('keyup', (e) => {
	removeActiveFilter();
	populateGallery(e.target.value, true);
});
SEARCH.addEventListener('mouseover', function () {
	this.style.width = '100%';
	SEARCH.children[1].style.paddingRight = '10px';
});
SEARCH.addEventListener('mouseleave', function () {
	this.style.width = '49px';
	SEARCH.children[1].style.paddingRight = 0;
});
