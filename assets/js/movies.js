document.addEventListener('DOMContentLoaded', function() {
  let headerElement = document.querySelector('#movies_header');

  let baseUrl = 'https://moviesdatabase.p.rapidapi.com';
  let apiKey = 'YOUR_API_KEY'; // Replace with your API key
  let page = 1;
  const queryString = document.location.search;
  let genre = queryString.split('=')[1];

  if (genre === "most_pop_movies"){
    headerElement.innerHTML = "Most Popular Movies";
  } else if (genre === "top_boxoffice_200"){
    headerElement.innerHTML = "Top Box Office";
  } else if (genre === "top_rated_250"){
    headerElement.innerHTML = "Top Rated";
  }
  

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
    var url = baseUrl + '/titles/?info=custom_info&list='+genre+'&sort=pos.incr&limit=48&page='+page;

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
    //listLocation.innerHTML = ''; // Clear previous movie listings

    for (var i = 0; i < data.length; i++) {
      var title = data[i].titleText.text;
      if(data[i].primaryImage === null || !data[i].primaryImage){
        var pic = "./assets/images/none.png";
      } else {
        var pic = data[i].primaryImage.url;
      }

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

  function handleInfiniteScroll(){
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if(endOfPage){
      page++;
      fetchAllMovies();
    }
  }

  this.addEventListener('scroll', handleInfiniteScroll);
});
