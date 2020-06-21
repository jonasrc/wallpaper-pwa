let xhttp = new XMLHttpRequest();

xhttp.open("GET", "data/data.json", true);

xhttp.send();

xhttp.onreadystatechange = function() {
  if(this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.response);
    let gridHtml = '';
    data.forEach((element) => {
      gridHtml+= fillGridItemTemplate(element);
    });

    let satGrid = document.getElementById("sattelite_grid");
    satGrid.insertAdjacentHTML("beforeend", gridHtml);
  }
};

function fillGridItemTemplate(element) {
  return `<a class="grid-item" href="/${element.id}">
      <figure class="grid-item--figure">
        <img class="grid-item--image" src="${element.thumbnail}" alt="${element.name}">
      </figure>
      <h3 class="grid-item--info">${element.name}</h3>
    </a>`;
}

