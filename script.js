const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash api
let count = 5;
const apiKey = config.MY_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}



// Get Photos from api
async function getPhotos()
{
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos()

    } catch (error) {
        
    }
}

// Create Elements For links & photos Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log("total images = ",totalImages)
    // Run Function for each object in photosArray
    photosArray.forEach((photo)=>{
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {href: photo.links.html, target: '_blank'})
        
        // create <img> for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttribute(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description})
        // Put <img> inside <a>, then both put inside imageContainer Element
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

// Helper function for setAttribute
function setAttribute(elements, attributes){
    for(const key in attributes)
    {
        elements.setAttribute(key, attributes[key])
    }
}



// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos()
    }
})

getPhotos()