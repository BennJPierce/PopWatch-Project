baseUrl = 'https://moviesdatabase.p.rapidapi.com'

function renderFrontPage(){
  //This will have all the functions that fetch and render different lists of movies on the front page
  renderTopBoxWeekend();
}

function fetchMovieList(sort, location){
  var url = baseUrl + '/titles/?info=custom_info&list='+sort;

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
      renderMovieList(data.results, location);
    })
    .catch(function (err) {
      console.error(err);
    })
  
}

function renderTopBoxWeekend(data) {
  //-This function will call a function that will create movie elements based on the data provided.
  //-The elements should be within an already existing container element.
  //renderMovieList(data, topBoxWeekend); ---example
  var sort = "top_boxoffice_last_weekend_10"
  var location = document.querySelector('#featured');
  fetchMovieList(sort, location);
}

function renderMovieList(data, listLocation) {
  //-This function will take whatever list of movies it is given, and will create the box elements
  //with the movie image and title.
  //-Will most likely need a loop
  //-Each Movie has to be a link that provides the movie id in its query string, this will allow us to open a
  //new html and use the query parameters to create the page for the individual movie
  var location = listLocation.children[0].children[0];
  for(var i = 0; i < data.length; i++) {
    console.log(data[i]);
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

    card.append(imageDisplay, titleDisplay);
    movieContainer.append(card);
    location.children[i].append(movieContainer);

    movieContainer.setAttribute('class', 'card');
    card.setAttribute('class', 'card');
    imageDisplay.setAttribute('class', 'card-image');
    titleDisplay.setAttribute('class', 'card-text');

    imageDisplay.style.backgroundImage = 'url('+pic+')';
    titleDisplay.innerHTML = title;
  }
  /*var title = data[9].titleText.text;
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
  titleDisplay.innerHTML = title;*/
}

renderFrontPage();
