let satteliteList;

retrieveSatelliteList();

function retrieveSatelliteList() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "data/data.json", true);
  xhttp.send();

  xhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      satteliteList = JSON.parse(this.response);
      updateGridHtml(satteliteList);
    }
  };
}

function updateGridHtml(satListJson) {
  const gridHtml = fillGridTemplate(satListJson);
  const satGrid = document.getElementById("satellite_grid");
  satGrid.innerHTML = "";
  satGrid.insertAdjacentHTML("beforeend", gridHtml);
}

function fillGridTemplate(satListJson) {
  let gridHtml = '';
  satListJson.forEach((satellite) => {
    gridHtml+= fillGridItemTemplate(satellite);
  });

  return gridHtml;
}

function fillGridItemTemplate(satellite) {
  return `<a class="grid-item" href="/details.html?id=${satellite.id}">
      <figure class="grid-item--figure">
        <img class="grid-item--image" src="${satellite.thumbnail}" alt="${satellite.name}">
      </figure>
      <h3 class="grid-item--info">${satellite.name}</h3>
    </a>`;
}

function searchPrep(input) {
  return input.toLowerCase().trim();
}

window.onload = () => {
  const searchForm = document.getElementById('search_form');
  const searchInput = document.getElementById('search_input');

  //Offline search mode
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let filteredList = satteliteList.filter((element) => {
      return searchPrep(element.name).includes(searchPrep(searchInput.value));
    });

    updateGridHtml(filteredList);
  });

  //TODO Online search mode
};

