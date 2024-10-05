//Anthony Phan
//asianp12@iastate.edu
//Oct 2, 2024

function fetchData() {
  const form = document.getElementById("my_form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputMovieName = document.getElementById("selectedMovie").value;
    fetch("MoviesFromJSON.json")
      .then((response) => response.json())
      .then((data) => {
        appendMoreData(data.movies, inputMovieName); // Access the movies array
      })
      .catch((error) => {
        console.log("error:" + error);
      });
  });
}

fetchData();

function appendMoreData(movies, inputMovieName) {
  let mainContainer = document.getElementById("col");
  mainContainer.innerHTML = ""; // Clear previous results

  for (let movie of movies) {
    if (movie.title.toLowerCase() === inputMovieName.toLowerCase()) {
      let title = movie.title;
      let year = movie.year;
      let url = movie.url;

      console.log(`Title: ${title}, Year: ${year}, URL: ${url}`); // Debugging step

      // Construct the HTML element
      let AddCardMovie = document.createElement("div");
      AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
      AddCardMovie.innerHTML = `
          <div class="card shadow-sm">
            <img src="${url}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <p class="card-text"><strong>${title}</strong>, ${year}</p>
            </div>
          </div>
        `;
      mainContainer.appendChild(AddCardMovie);
    }
  }
}

function showCardsSortedByPriceLowHigh() {
  fetch("MoviesFromJSON.json")
    .then((response) => response.json())
    .then((data) => {
      loadMovies(data.movies, 1); // Pass the movies array and sorting flag
    })
    .catch((err) => console.log("Error: " + err));
}

function showCardsSortedByPriceHighLow() {
  fetch("MoviesFromJSON.json")
    .then((response) => response.json())
    .then((data) => {
      loadMovies(data.movies, 2); // Pass the movies array and sorting flag
    })
    .catch((err) => console.log("Error: " + err));
}

function showCardsContainingDescriptionA() {
  const inputField = document.getElementById("inputField");
  inputField.style.display = "block";
}

function showCardsContainingDescriptionB() {
  const descriptionInput = document.getElementById("descriptionInput").value.toLowerCase();

  fetch("MoviesFromJSON.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredMovies = data.movies.filter(movie => movie.description.toLowerCase().includes(descriptionInput));

      const colDiv = document.getElementById("col");
      colDiv.innerHTML = ""; // Clear previous results

      filteredMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "col";
        movieCard.innerHTML = `
          <div class="card shadow-sm">
            <img src="${movie.url}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">${movie.description}</p>
            </div>
          </div>
        `;
        movieCard.addEventListener('click', () => {
          movieCard.querySelector('.card').style.backgroundColor = 'lightblue';
        });
        colDiv.appendChild(movieCard);
      });
    })
    .catch((err) => console.log("Error: " + err));
}

function loadMovies(movies, n) {
  const arrayMovies = [...movies]; // Copy the movies array

  if (n === 1) {
    sortedMovies = arrayMovies.sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
  } else if (n === 2) {
    sortedMovies = arrayMovies.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
  } else if (n === 3) {
    const inputDescription = document.getElementById("descriptionInput").value;
    document.getElementById("inputField").style.display = "none";
    for (let movie of arrayMovies) {
      if (movie, description.includes(inputDescription)) {
        sortedNovies, push(movie);
      }
    }
  }
  let mainContainer = document.getElementById("col");
  mainContainer.innerHTML = ""; // Clear previous results

  for (let movie of sortedMovies) {
    let title = movie.title;
    let year = movie.year;
    let url = movie.url;
    let price = movie.price;

    console.log(`Title: ${title}, Year: ${year}, URL: ${url}, Price: ${price}`); // Debugging step

    // Construct the HTML element
    let AddCardMovie = document.createElement("div");
    AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
    AddCardMovie.innerHTML = `
        <div class="card shadow-sm">
          <img src="${url}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <p class="card-text"><strong>${title}</strong>, ${year}, $${price}</p>
          </div>
        </div>
      `;
    mainContainer.appendChild(AddCardMovie);
  }
}