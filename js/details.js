const MILES_TO_KM = 1.609;
const FLOAT_PRECISION = 3;

const urlParams = new URLSearchParams(window.location.search);
const satId = urlParams.get('id');

let xhttp = new XMLHttpRequest();

xhttp.open("GET", `data/${satId}.json`, true);

xhttp.send();

xhttp.onreadystatechange = function() {
  if(this.readyState === 4 && this.status === 200) {
    const detailsData = JSON.parse(this.response);
    const detailsHtml = fillDetailsTemplate(detailsData);
    let detailsSection = document.getElementById("satellite_details");
    detailsSection.insertAdjacentHTML("beforeend", detailsHtml);
  }
};

function fillDetailsTemplate(element) {
  return `
      <h1 class="sat-details--title">${element.name}</h1>
      <figure class="sat-details--figure">
        <img class="sat-details--img" src="${element.image}" alt="${element.name}">
        <figcaption class="sat-details--img-caption">${element.name} | High definition image | Save as your wallpaper!</figcaption>
      </figure>

      <h2 class="sat-details--subtitle">General data</h2>
      <div class="sat-details--info-grid">
        <p class="sat-details--info">Name: <span>${element.name}</span></p>
        <p class="sat-details--info">Launch date: <span>${formatDate(element.launch_date)}</span></p>
        <p class="sat-details--info">NORAD TLE: <span>${element.number}</span></p>
        <p class="sat-details--info">Classification: <span>${element.classification}</span></p>
        <p class="sat-details--info">Country: <span>${element.country}</span></p>
        <p class="sat-details--info">Type: <span>${element.type}</span></p>
        <p class="sat-details--info">Orbital period: <span>${element.orbital_period} minutes</span></p>
        <p class="sat-details--info">COSPAR ID: <span>${element.intldes}</span></p>
      </div>

      <h2 class="sat-details--subtitle">Location data</h2>
      <div class="sat-details--location-grid">
        <p class="sat-details--location">Coordinates: <span>${roundNumber(element.lat)}, ${roundNumber(element.lng)}</span></p>
        <p class="sat-details--location">Height: <span>${roundNumber(element.height * MILES_TO_KM)} km</span></p>
        <p class="sat-details--location">Speed: <span>${roundNumber(element.speed * MILES_TO_KM)} km/h</span></p>
      </div>`;
}

function formatDate(utcDateTimeString) {
  let date = new Date(utcDateTimeString);
  return date.toGMTString();
}

function roundNumber(number) {
  let numberObj = new Number(number);
  return numberObj.toFixed(FLOAT_PRECISION);
}

