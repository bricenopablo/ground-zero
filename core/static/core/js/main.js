// DOM Elements
const NAVBAR = document.querySelector("nav");
const GO_UP = document.querySelector(".go-up");

// Events listeners
window.addEventListener("scroll", function () {
  if (this.scrollY > 130) {
    NAVBAR.classList.add("scrolled");
  } else {
    NAVBAR.classList.remove("scrolled");
  }

  if (this.scrollY > 1300) {
    GO_UP.classList.remove("hidden");
  } else {
    GO_UP.classList.add("hidden");
  }
});

GO_UP.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

/*------------------------------------------*
 *                Temperatura               *
 *------------------------------------------*/

// Obtiene el div de la temperatura
const TEMP = $("#temperatura");

// Comprueba si la geolocalización existe en el navegador
if (navigator.geolocation) {
  // Se obtiene la posición actual de la geolocalización
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    const apiKey = "7e44c52c5de38936a192d3057804cd39";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    // Se hace un llamado al servicio web para obtener los datos de la temperatura
    $.get(url, (data) => {
      // Se rellenan los datos de la temperatura
      TEMP.html(`
			<h3>Temperatura</h3>
			<div class="d-flex align-items-center justify-content-center">
				<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />
				${data.main.temp}°C
			</div>
			`);
    });
  });
}
// Si no existe la geolocalización, se envia este mensaje.
else {
  TEMP.html("Tu navegador no soporta la geolocalización");
}
