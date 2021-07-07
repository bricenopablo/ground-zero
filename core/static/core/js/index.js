"use strict";

// Variables referentes elementos del HTML
const CAROUSEL = document.querySelector("#carrusel");
const SEARCH = document.querySelector("#search");
const MODALS = document.querySelector("#modals");
const GALLERY = document.querySelector(".art-gallery__images");
const FILTERS = document.getElementsByClassName("filter");
const FILTER_ACTIVE = document.querySelector(".filter.active");

const removeActiveFilter = () => {
  for (let i = 0; i < FILTERS.length; i++) {
    FILTERS[i].classList.remove("active");
  }
};

const populateGallery = (valor) => {
  $.ajax({
    url: "/",
    type: "GET",
    data: {
      search: valor,
    },
    success: function (data) {
      GALLERY.style.opacity = 0;
      setTimeout(() => {
        GALLERY.innerHTML = "";
        if (JSON.parse(data).length === 0) {
          GALLERY.innerHTML = `<p style="text-align: center;">No hay datos disponibles.</p>`;
        }
        JSON.parse(data).forEach((arte) => {
          GALLERY.innerHTML += `
          <div class="gallery__item">
            <img
              src="${arte.imagen}"
              alt="${arte.nombreArte}"
            />
            <div class="view-more">
              <p>${arte.nombreArte}</p>
              <p>${arte.artista}</p>
              <a href="/arte/${arte.idArte}" class="view-more__btn">Más detalles</a>
            </div>
          </div>`;
        });
        GALLERY.style.opacity = 1;
      }, 600);
    },
  });
};

// Events listeners
SEARCH.addEventListener("mouseover", function () {
  this.style.width = "100%";
  SEARCH.children[1].style.paddingRight = "10px";
  SEARCH.children[1].focus();
});
SEARCH.children[1].addEventListener("blur", function () {
  SEARCH.style.width = "49px";
  this.style.paddingRight = 0;
});

Array.from(FILTERS).forEach((filter) => {
  filter.addEventListener("click", () => {
    removeActiveFilter();
    filter.classList.add("active");
    if (filter.innerHTML === "Todas") {
      populateGallery("");
    } else {
      populateGallery(filter.innerHTML);
    }
  });
});

$(document).on("submit", (e) => {
  e.preventDefault();

  populateGallery($("#buscar").val());
});

const GALLERY_INT = $(".gallery-international");

function galleryImage(item) {
  const imagenurl = `https://lakeimagesweb.artic.edu/iiif/2/${item.image_id}/full/250,250/0/default.jpg`;
  GALLERY_INT.append(`
		<div class="gallery__item">
			<img src="${imagenurl}">
			<div class="view-more">
				<span><b>Titulo:</b> ${item.title}</span>
				<span><b>Artista:</b> ${item.artist_display}</span>
				<span><b>Origen:</b> ${item.place_of_origin}</span>
			</div>
		</div>`);
}

//Llamamos a la API y creamos una función.
$.get(
  "https://api.artic.edu/api/v1/artworks?fields=title,artist_display,image_id,place_of_origin",
  function (data) {
    console.log(data);
    //Llamamos a cada uno de los elementos de la API y se pobla la tabla de venta internacional con las imagenes.
    data.data.forEach(function (item) {
      galleryImage(item);
    });
  }
);

$.get("https://restcountries.eu/rest/v2", function (countries) {
  countries.forEach(function (country) {
    $("#origin").append(
      `<option value="${country.name}">${country.name}</option>`
    );
  });
});
$.get("https://api.artic.edu/api/v1/artists", function (artists) {
  artists.data.forEach(function (artist) {
    $("#artist").append(
      `<option value="${artist.id}">${artist.title}</option>`
    );
  });
});

$("#artist").on("change", function () {
  const artistID = $(this).val();
  GALLERY_INT.empty();
  $.get(`https://api.artic.edu/api/v1/artists/${artistID}`, function (artist) {
    artist.data.artwork_ids.forEach(function (id) {
      $.get(`https://api.artic.edu/api/v1/artworks/${id}`, function (item) {
        galleryImage(item.data);
        console.log(item);
      });
    });
  });
});

$("#search-art").validate({
  rules: {
    name: {
      required: true,
      minlength: 3,
    },
    artist: {
      required: false,
    },
  },
  messages: {
    name: {
      required: "Por favor ingrese el nombre de la obra.",
      minlength: "Debe ingresar por lo menos 3 caracteres",
    },
  },
  showErrors: function (errorMap, errorList) {
    // Si el numero de errores es mayor a 0 entonces se muestran los errores
    if (this.numberOfInvalids() > 0) {
      $("#errors").show();
      $("#errors").html(
        "Tienes " +
          this.numberOfInvalids() +
          " error(es):<ul>" +
          errorList.map(function (error) {
            return "<li>" + error.message + "</li>";
          }) +
          "</ul>"
      );
      // Si no, entonces se oculta
    } else {
      $("#errors").hide();
    }
  },
  submitHandler: function (form) {
    const name = $("#name").val();

    $("#artist").val("none");

    const url = `https://api.artic.edu/api/v1/artworks/search?q=${name}`;
    $.get(url, function (data) {
      console.log(data);
      GALLERY_INT.empty();
      data.data.forEach(function (item) {
        $.get(
          item.api_link +
            "?fields=title,artist_display,image_id,place_of_origin",
          function (element) {
            galleryImage(element.data);
          }
        );
      });
    });
  },
});
