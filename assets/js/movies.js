document.addEventListener('DOMContentLoaded', function() {
  const baseUrl = 'https://moviesdatabase.p.rapidapi.com';
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key

  function fetchMoviesByGenre(genre) {
    var url = baseUrl + '/titles?genre=' + genre;

    fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderMovieList(data.results, document.querySelector('#moviespage'));
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function fetchAllMovies() {
    var url = baseUrl + '/titles';

    fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '21c23dbafcmshe8c3bdcb0d21f32p19b5cdjsn15172eebf085',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderMovieList(data.results, document.querySelector('#moviespage'));
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function renderFrontPage() {
    fetchAllMovies();
  }

  function renderMovieList(data, listLocation) {
    listLocation.innerHTML = ''; // Clear previous movie listings

    for (var i = 0; i < data.length; i++) {
      var title = data[i].titleText.text;
      var pic = data[i].primaryImage.url;

      var movieContainer = document.createElement('div');
      var card = document.createElement('a');
      var titleDisplay = document.createElement('div');
      var imageDisplay = document.createElement('div');

      card.append(imageDisplay, titleDisplay);
      movieContainer.append(card);
      listLocation.append(movieContainer);

      movieContainer.setAttribute('class', 'card');
      card.setAttribute('class', 'card');
      imageDisplay.setAttribute('class', 'card-image');
      titleDisplay.setAttribute('class', 'card-text');

      imageDisplay.setAttribute('style', 'background-image: url(' + pic + ')');
      titleDisplay.innerHTML = title;
    }
  }

  function handleGenreSelection(event) {
    var genre = event.target.innerHTML;
    fetchMoviesByGenre(genre);
  }

  renderFrontPage();

  var genreLinks = document.querySelectorAll('.dropdown-content a');
  genreLinks.forEach(function(link) {
    link.addEventListener('click', handleGenreSelection);
  });
});
