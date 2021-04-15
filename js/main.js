// DOM Elements
const NAVBAR = document.querySelector('nav');
const GO_UP = document.querySelector('.go-up');

// Events listeners
window.addEventListener('scroll', function () {
	if (this.scrollY > 130) {
		NAVBAR.classList.add('scrolled');
	} else {
		NAVBAR.classList.remove('scrolled');
	}

	if (this.scrollY > 1300) {
		GO_UP.classList.remove('hidden');
	} else {
		GO_UP.classList.add('hidden');
	}
});

GO_UP.addEventListener('click', () => {
	window.scroll({
		top: 0,
		behavior: 'smooth'
	});
});
