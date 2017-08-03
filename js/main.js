// Controlling email modal window
var btn_email = document.querySelector(".btn-email"),
    modal = document.querySelector(".modal-email"),
    btn_cancel = document.querySelector(".btn-cancel"),
    btn_close = document.querySelector(".modal-email-close-btn"),
    form = modal.querySelector(".modal-email-form"),
    login = document.getElementById("login-field"),
    email = document.getElementById("email-field"),
    message = document.getElementById("message-field"),
    login_storage = localStorage.getItem("login"),
    email_storage = localStorage.getItem("email");

/* Form opening and focus on the first unfilled field */
btn_email.addEventListener("click", function(event) {    
  event.preventDefault();
  modal.classList.add("modal-email-show");
  
  login.value = login_storage;
  email.value = email_storage;
  
  if (login.value && email.value) {
    message.focus();
  } else if (login.value) {
    email.focus();
  } else {
    login.focus();
  }
});

/* Write variable values in LocalStorage when a field is changed */
login.addEventListener("change", function(event) { 
    localStorage.setItem("login", login.value);
});

email.addEventListener("change", function(event) { 
    localStorage.setItem("email", email.value);
});

/* Move focus on the neighbour field when Enter is pressed */
login.addEventListener("keydown", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    if (login.value) {
      email.focus();
    }
  }   
});

email.addEventListener("keydown", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    if (email.value) {
      message.focus();
    }
  }
});

/*
Checking entered fields" values, 
showing an error when fields are empty,
sending and closing of the form if it's filled correctly
*/
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!login.value || !email.value) {
    modal.classList.add("modal-email-error");
    if (!login.value) {
      login.classList.add("error");
    }
    if (!email.value) {
      email.classList.add("error");
    }
  } else{
    console.log("Форма отправлена");
    modal.classList.remove("modal-email-show");
  }
});

/* Close the form on btn_close click */
btn_close.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.remove("modal-email-show");
});

/* Close the form on btn_cancel click */
btn_cancel.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.remove("modal-email-show");
});

/* Close the form if Escape button is pressed */
window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27 && modal.classList.contains("modal-email-show")) {
    modal.classList.remove("modal-email-show");
  }
});

// Using Google Maps API for creating an interactive map
function initialize() {

  var centerLatLng = new google.maps.LatLng(59.939140, 30.319953),
      targetLatLng = new google.maps.LatLng(59.938759, 30.323062);

  var mapOptions = {
    zoom: 17,
    center: centerLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("main-footer-map"), mapOptions);

  var markerImg = "img/marker-img.png";

  var marker = new google.maps.Marker({
    map: map,
    position: targetLatLng,
    title: "Дизайн-студия Nёrds",
    clickable: true,
    icon: markerImg,
    shape: {coords: [0,0,231,190], type: "rect"}
  });
}

google.maps.event.addDomListener(window, "load", initialize);
