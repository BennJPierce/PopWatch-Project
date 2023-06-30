baseUrl = 'https://moviesdatabase.p.rapidapi.com'

function renderFrontPage(){
  //This will have all the functions that fetch and render different lists of movies on the front page
  fetchTopBoxWeekend();
}

function fetchTopBoxWeekend(){
  var url = baseUrl + '/titles/?info=custom_info&list=top_boxoffice_last_weekend_10';

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
      renderTopBoxWeekend(data);
    })
    .catch(function (err) {
      console.error(err);
    })
  
}

function renderTopBoxWeekend(data) {
  //-This function will call a function that will create movie elements based on the data provided.
  //-The elements should be within an already existing container element.
  //renderMovieList(data, topBoxWeekend); ---example
  var movieList = data.results;
  var location = document.querySelector('#one');
  renderMovieList(movieList, location);
}

function renderMovieList(data, listLocation) {
  //-This function will take whatever list of movies it is given, and will create the box elements
  //with the movie image and title.
  //-Will most likely need a loop
  //-Each Movie has to be a link that provides the movie id in its query string, this will allow us to open a
  //new html and use the query parameters to create the page for the individual movie
  var title = data[9].titleText.text;
  var pic = data[9].primaryImage.url;

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

  imageDisplay.style.backgroundImage = 'url('+pic+')';
  titleDisplay.innerHTML = title;
}

renderFrontPage();




