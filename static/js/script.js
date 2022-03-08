const imageContainer = document.getElementById("imageContainer");
const loader = document.getElementById("loader");

let photosArray = [];
let imageNumber = 1;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 10;
const apiKey = 'GjG7PzR9FxS9oYGr4W-b0jakP1rJxUA6pKoScGPPZRc';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        document.getElementById("loader").classList.add("hidden");
    }
}

// Display photos from photosArray
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {

        let image = `<a href="${photo.links.html}" target="_blank">
        <img id="img_${imageNumber}" class="img" src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}"></img>
        </a>`;
        imageContainer.innerHTML += image;
        document.getElementById(`img_${imageNumber}`).addEventListener("load", imageLoaded);
        imageNumber++;
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        // Catch Error Here
        console.log(error)
    }

}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

//

//On Load
getPhotos();
