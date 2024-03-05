const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTA5ZmI5NGRkZDk1YjQzODc3YjhhODM3ODNjMjU0YyIsInN1YiI6IjY1ZTU2OWQyZmUwNzdhMDE2MjEwMDM3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1RHTG822l16B_huT6buGdDSIJstI6iMZcKlClU-JrXo";
const imgFirstPart = "https://image.tmdb.org/t/p/w500";

// =====DOM=====

let nowPlaying = document.getElementById('nowPlaying')
let popular = document.getElementById('popular')
let topRated = document.getElementById('topRated')
let upcoming = document.getElementById('upcoming')

let search = document.getElementById('search')

let moviePoster = document.getElementById('moviePoster')
let title = document.getElementById('title')
let description = document.getElementById('description')
let releaseDate = document.getElementById('ratingComment')
let rating = document.getElementById('rating')

let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPassword = document.getElementById('userPassword')
let userRePassword = document.getElementById('userRePassword')
let userAge = document.getElementById('userAge')
let userMobile = document.getElementById('userMobile')

let messageName = document.getElementById("messageName")
let messageAge = document.getElementById("messageAge")
let messageEmail = document.getElementById("messageEmail")
let messageMobile = document.getElementById("messageMobile")
let messagePassword = document.getElementById("messagePassword")
let messageRePassword = document.getElementById("messageRePassword")
let messageSuccess = document.getElementById("messageSuccess")

// =====Functions=====


$(function() {
    $('#loading').fadeOut(2000, function() {
        $('.loader').fadeout(1000, function() {
            $('body').css('overflow-y','auto')
        });
    })
    
});


let navBodyWidth = $(".nav-body").outerWidth();

function closeSideNavbar(time) {
    $(".side-navbar").animate({left:-navBodyWidth},time);
    $(".toggler-icon").removeClass("fa-xmark");
    $(".toggler-icon").addClass("fa-bars");
    $(".nav-links li").animate({top:300},500);
};
closeSideNavbar(0)

$(".toggler-icon").click(function () { 

    if ($(".side-navbar").css('left') == '0px') {
        
        closeSideNavbar(500);

    } else {
        $(".side-navbar").animate({left: 0},500);
        $(".toggler-icon").removeClass("fa-bars");
        $(".toggler-icon").addClass("fa-xmark");

        for ( let i = 0 ; i < 6 ; i++) {
            $(".nav-links li").eq(i).animate({top:0}, (i+6)*100);
        }
    }
});


let btn = $('#btnUp');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('d-block');
    btn.removeClass('d-none');
  } else {
    btn.removeClass('d-block');
    btn.addClass('d-none');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});



async function getMovies (movieType) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTA5ZmI5NGRkZDk1YjQzODc3YjhhODM3ODNjMjU0YyIsInN1YiI6IjY1ZTU2OWQyZmUwNzdhMDE2MjEwMDM3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1RHTG822l16B_huT6buGdDSIJstI6iMZcKlClU-JrXo'
        }
      };
      
      let responseApi = await fetch(`https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=1`, options)
      let response = await responseApi.json()
      let movie = response.results;
      return movie
}



async function displayData (movieType="now_playing") {
    
    let movie = await getMovies(movieType)

    let cartona = '';

    for(let i = 0 ; i <movie.length; i++){
        
        let imgLink = `${imgFirstPart}` + `${movie[i].poster_path}`

        cartona += `
        <div class="col-md-6 col-lg-4">
                <div class="movie">
                    <img id="moviePoster" src=${imgLink} alt="" class="w-100">
                    <div class="movie-details">
                        <div class="h2-wrapper">
                            <h2 id="title">${movie[i].original_title}</h2>
                        </div>
                        <p id="description" class="description">${movie[i].overview}</p>
                        <p id="ratingComment" class="ratingComment">${movie[i].release_date}</p>
                        <div id="rating" class="rating">${movie[i].vote_average}</div>
                    </div>
                </div>
            </div>
        `
        
        document.getElementById("data").innerHTML = cartona;
    }
}
displayData()


search.addEventListener('input', function(){
    displaySearchData(search.value)
})


async function searchMovies (movieName) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTA5ZmI5NGRkZDk1YjQzODc3YjhhODM3ODNjMjU0YyIsInN1YiI6IjY1ZTU2OWQyZmUwNzdhMDE2MjEwMDM3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1RHTG822l16B_huT6buGdDSIJstI6iMZcKlClU-JrXo'
        }
      };
      
      let responseApi = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=8109fb94ddd95b43877b8a83783c254c`, options)
      let response = await responseApi.json()
      let movie = response.results;
      return movie
}


async function displaySearchData (movieName) {
    
    let movieByName = await searchMovies(movieName)

    let cartona = '';

    for(let i = 0 ; i <movieByName.length; i++){
        
        let imgLink = `${imgFirstPart}` + `${movieByName[i].poster_path}`

        cartona += `
        <div class="col-md-6 col-lg-4">
                <div class="movie">
                    <img id="moviePoster" src=${imgLink} alt="" class="w-100">
                    <div class="movie-details">
                        <div class="h2-wrapper">
                            <h2 id="title">${movieByName[i].original_title}</h2>
                        </div>
                        <p id="description" class="description">${movieByName[i].overview}</p>
                        <p id="ratingComment" class="ratingComment">${movieByName[i].release_date}</p>
                        <div id="rating" class="rating">${movieByName[i].vote_average}</div>
                    </div>
                </div>
            </div>
        `
        
        document.getElementById("data").innerHTML = cartona;
    }
}


// =====Events=====


document.getElementById('navlinks').addEventListener( 'click', function(e){
    let link = (e.target.innerHTML);

    if(link == "Now Playing") {
        displayData("now_playing");
    } else if(link == "Popular") {
        displayData("popular");
    } else if (link == "Top Rated") {
        displayData("top_rated")
    }  else if (link == "Upcoming") {
        displayData("upcoming");
    }
})



// =====Validation/REGEX=====


function validationName() {
    
    let regex = /^[A-Z][a-z]{2,10}$/

    $(userName).mouseout(function () { 
        messageName.classList.add("d-none");
        messageName.classList.remove("d-block")
    });

        if (regex.test(userName.value) == true) {
            messageName.classList.add("d-none");
            messageName.classList.remove("d-block")
            return true
        } else {
            messageName.classList.add("d-block");
            messageName.classList.remove("d-none")
            return false
        }
        
    }
    

function validationAge() {
    
    let regex = /^[1-8][0-9]$/
    
    $(userAge).mouseout(function () { 
        messageAge.classList.add("d-none");
        messageAge.classList.remove("d-block")
    });
        if (regex.test(userAge.value) == true) {
            messageAge.classList.add("d-none");
            messageAge.classList.remove("d-block")
            return true
        } else {
            messageAge.classList.add("d-block");
            messageAge.classList.remove("d-none")
            return false
        }    
}

function validationMobile() {
    
    let regex = /^[0-9][0-9]{10}$/
    
    $(userMobile).mouseout(function () { 
        messageMobile.classList.add("d-none");
        messageMobile.classList.remove("d-block")
    });

        if (regex.test(userMobile.value) == true) {
            messageMobile.classList.add("d-none");
            messageMobile.classList.remove("d-block")
            return true
        } else {
            messageMobile.classList.add("d-block");
            messageMobile.classList.remove("d-none")
            return false
        }    
}

function validationEmail() {

    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    $(userEmail).mouseout(function () { 
        messageEmail.classList.add("d-none");
        messageEmail.classList.remove("d-block")
    });
    if (regex.test(userEmail.value) == true) {    
        messageEmail.classList.add("d-none");
        messageEmail.classList.remove("d-block")
        return true
    } else {
        messageEmail.classList.add("d-block");
        messageEmail.classList.remove("d-none")
        return false
    }
    
}

function validationPassword() {

    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    $(userPassword).mouseout(function () { 
        messagePassword.classList.add("d-none");
        messagePassword.classList.remove("d-block")
    });
    if (regex.test(userPassword.value) == true) {
        messagePassword.classList.add("d-none");
        messagePassword.classList.remove("d-block")
        return true
    } else {
        messagePassword.classList.add("d-block");
        messagePassword.classList.remove("d-none")
        return false
    }
    
}


function validationRePassword() {

    $(userRePassword).mouseout(function () { 
        messageRePassword.classList.add("d-none");
        messageRePassword.classList.remove("d-block")
    });

    if ( userRePassword.value == userPassword.value ) {
        messageRePassword.classList.add("d-none");
        messageRePassword.classList.remove("d-block")
        return true
    } else {
        messageRePassword.classList.add("d-block");
        messageRePassword.classList.remove("d-none")
        return false
    }
    
}





