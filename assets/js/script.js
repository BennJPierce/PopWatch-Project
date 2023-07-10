const baseUrl = 'https://moviesdatabase.p.rapidapi.com'
const chuckUrl = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random?category=movie'
const apiKey = '21c23dbafcmshe8c3bdcb0d21f32p19b5cdjsn15172eebf085'
const chuckElement = document.querySelector('#chuckJoke');
const emptyWatchElement = document.querySelector('#emptyness');
let watchList = [];

// Runs all the rendering functions
function renderFrontPage(){
  renderTopBoxWeekend();
  renderTopBox200();
  renderTopRated();
  renderMostPopular();
  fetchChuckNorris();
}

// Fethes the chuck norris joke
function fetchChuckNorris(){
  fetch(chuckUrl, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    chuckElement.innerHTML = data.value; //adds the joke to the page
  })
  .catch(function(err){
    console.errror(err);
  })
}

// Fetches an individual movie's info
function fetchMovie(movieId){
  let url = baseUrl + '/titles/' + movieId;

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
      renderWatchList(data.results);
    })
    .catch(function (err) {
      console.error(err);
    })
}

// Fetches a list of movies depending on the sort
function fetchMovieList(sort, location){
  var url = baseUrl + '/titles/?info=custom_info&list='+sort;

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
      renderMovieList(data.results, location);
    })
    .catch(function (err) {
      console.error(err);
    })
  
}

// These render functions find the location and provide the sort for the fetch
function renderTopBoxWeekend() {
  var sort = "top_boxoffice_last_weekend_10"
  var location = document.querySelector('#featured');
  fetchMovieList(sort, location);
}

function renderTopBox200(){
  var sort = 'top_boxoffice_200&sort=pos.incr';
  var location = document.querySelector('#box_office');
  fetchMovieList(sort, location);
}

function renderTopRated(){
  var sort = 'top_rated_250&sort=pos.incr';
  var location = document.querySelector('#rated');
  fetchMovieList(sort, location);
}

function renderMostPopular(){
  var sort = 'most_pop_movies&sort=pos.incr';
  var location = document.querySelector('#popular');
  fetchMovieList(sort, location);
}

// This function creates the movie list elements
function renderMovieList(data, listLocation) {
  var location = listLocation.children[0].children[0];
  for(var i = 0; i < data.length; i++) {
    var title = data[i].titleText.text;
    if(data[i].primaryImage === null){
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
    location.children[i].append(movieContainer);
    
    movieContainer.setAttribute('class', 'card');
    card.setAttribute('class', 'card');
    imageDisplay.setAttribute('class', 'card-image');
    titleDisplay.setAttribute('class', 'card-text');
    if(watchList.indexOf(data[i].id) !== -1){
      watchButton.setAttribute('class', 'yesWatch');
      watchButton.innerHTML = 'Watchlisted!';
    } else{
      watchButton.setAttribute('class', 'noWatch');
      watchButton.innerHTML = 'Add to Watchlist';
      watchButton.addEventListener("click", addToWatchList);
    }
    
    watchButton.setAttribute('data-movieid', data[i].id)
    

    
    imageDisplay.style.backgroundImage = 'url('+pic+')';
    titleDisplay.innerHTML = title;
  }
}

// This function creates the watchlist elements
function renderWatchList(movie){
  let location = document.querySelector('#watchlist');
  if(watchList){
    emptyWatchElement.remove();
  }
  let title = movie.titleText.text;
  if(movie.primaryImage === null){
    var pic = "./assets/images/none.png";
  } else {
    var pic = movie.primaryImage.url;
  }

  let movieContainer = document.createElement('div');
  let card = document.createElement('a');
  let titleDisplay = document.createElement('div');
  let imageDisplay = document.createElement('div');
  let removeButton = document.createElement('button');

  card.append(imageDisplay, titleDisplay, removeButton);
  movieContainer.append(card);
  location.append(movieContainer);

  movieContainer.setAttribute('class', 'card');
  card.setAttribute('class', 'card');
  imageDisplay.setAttribute('class', 'card-image');
  titleDisplay.setAttribute('class', 'card-text');
  removeButton.setAttribute('class', 'remove');
  removeButton.setAttribute('data-movieid', movie.id);
  removeButton.addEventListener("click", removeWatchlist);

  removeButton.innerHTML = 'Remove';
  imageDisplay.style.backgroundImage = 'url('+pic+')';
  titleDisplay.innerHTML = title;
}

// This function keeps the watchList up to date with the local storage
function rememberWatchList(){
  let rememberedList = localStorage.getItem('watchList');
  if(rememberedList){
    watchList = JSON.parse(rememberedList);
  }
  for(let i = 0; i < watchList.length; i++){
    fetchMovie(watchList[i]);
  }
}
// This function removes a movie from the watchList array and sets the localStorage
function removeWatchlist(){
  let titleId = this.getAttribute('data-movieid');
  watchList.splice(watchList.indexOf(titleId), 1);
  localStorage.setItem('watchList', JSON.stringify(watchList));
  location.reload();
}

// This function adds the movie that was clicked on to the localStorage and watchlist
function addToWatchList(event){
  let titleId = this.getAttribute('data-movieid');
  if(watchList.indexOf(titleId) !== -1){
    return;
  }
  watchList.push(titleId);

  localStorage.setItem('watchList', JSON.stringify(watchList));
  event.target.setAttribute('class', 'yesWatch');
  event.target.innerHTML = 'Watchlisted!';
  fetchMovie(titleId);
}

rememberWatchList();
renderFrontPage();




