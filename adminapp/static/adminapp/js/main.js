const ADD_BTN = document.querySelector(".add-btn");
const CLOSE_BTN = document.querySelector(".close-btn");
const ART_FORM = document.querySelector(".art-form");
ADD_BTN.addEventListener("click", () => {
  document.body.classList.add("form-opened");
})
CLOSE_BTN.addEventListener("click", () => {
  document.body.classList.remove("form-opened");
})

let imagenes = 0;
const addImageField = () => {
  imagenes++;
  const BUTTON_IMG = document.querySelectorAll('.form-field')[document.querySelectorAll('.form-field').length];
  const IMAGES_FIELD = document.querySelector('#images-field');
  const div = document.createElement("div");
  div.classList.add("form-field")
  div.innerHTML = `
    <label for="id_form-${imagenes}-imagen">Imagen ${imagenes}:</label>
    <input type="file" name="form-${imagenes}-imagen" accept="image/*" id="id_form-${imagenes}-imagen">
    <input type="hidden" name="form-${imagenes}-idImagen" id="id_form-${imagenes}-idImagen">
  `;
    IMAGES_FIELD.insertBefore(div, BUTTON_IMG);
  document.getElementById("id_form-TOTAL_FORMS").setAttribute("value", imagenes+1);
}