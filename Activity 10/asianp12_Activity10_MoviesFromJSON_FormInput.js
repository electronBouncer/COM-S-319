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