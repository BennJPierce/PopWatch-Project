document.addEventListener('DOMContentLoaded', function() {
  let headerElement = document.querySelector('#movies_header');

  let baseUrl = 'https://moviesdatabase.p.rapidapi.com';
  let apiKey = 'YOUR_API_KEY'; // Replace with your API key
  let page = 1;
  const queryString = document.location.search;
  let genre = queryString.split('=')[1];
  let watchList = [];

  // Handles the sort depending on the button used to get here
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
        renderMovieList(data.results, document.querySelector('#moviespage'));
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  // Fetches the movies from the sort provided (genre isn't the right word to use here but idc anymore)
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
      var watchButton = document.createElement('button');

      card.append(imageDisplay, titleDisplay, watchButton);
      movieContainer.append(card);
      listLocation.append(movieContainer);
      if(watchList.indexOf(data[i].id) !== -1){
        watchButton.setAttribute('class', 'yesWatch');
        watchButton.innerHTML = 'Watchlisted!';
      } else{
        watchButton.setAttribute('class', 'noWatch');
        watchButton.innerHTML = 'Add to Watchlist';
        watchButton.addEventListener("click", addToWatchList);
      }

      watchButton.setAttribute('data-movieid', data[i].id)
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

  // Watchlist functions from the main page, makes them work here
  function rememberWatchList(){
    let rememberedList = localStorage.getItem('watchList');
    if(rememberedList){
      watchList = JSON.parse(rememberedList);
    }
  }

  function addToWatchList(event){
    let titleId = this.getAttribute('data-movieid');
    if(watchList.indexOf(titleId) !== -1){
      return;
    }
    watchList.push(titleId);

    localStorage.setItem('watchList', JSON.stringify(watchList));
    event.target.setAttribute('class', 'yesWatch');
    event.target.innerHTML = 'Watchlisted!';
  }

  rememberWatchList();
  renderFrontPage();

  var genreLinks = document.querySelectorAll('.dropdown-content a');
  genreLinks.forEach(function(link) {
    link.addEventListener('click', handleGenreSelection);
  });

  // Infinite scroll function
  function handleInfiniteScroll(){
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if(endOfPage){
      page++;
      fetchAllMovies();
    }
  }

  this.addEventListener('scroll', handleInfiniteScroll);
});
