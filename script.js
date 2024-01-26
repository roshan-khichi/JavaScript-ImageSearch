const key = 'L6-U7CehftTVfXzGxHe8_8PJKYIyVJoJ6vmnOZibnFs';
const input = document.getElementById('search-input')
const imagesContainer = document.querySelector('.search-results');
const saerchButton = document.getElementById('search-button');
const showMore = document.getElementById('show-more-button');


let query;
let pageNumber = 1;

function images(pageNumber) {
    fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=12&query=${query}&orientation=landscape&client_id=${key}`)
    .then((value) => {
        return value.json();
    }).then((data) => {
        if(data.total>0){
        data.results.forEach((element) => {
            let  html = `<div class="search-result">
                            <img src="${element.urls.regular}" alt="${element.alt_description}" data-image-id="${element.urls.full}" data-image-description="${element.alt_description}" >
                            <a href="${element.links.html}" target="_blank">${element.alt_description}</a>
                        </div>`;    
            imagesContainer.innerHTML += html;
        });
        document.querySelectorAll('.search-result')
            .forEach((images) => {
                images.children[0].addEventListener('click', () => {
                    let imageId = images.children[0].dataset.imageId;
                    const description = images.children[1].textContent;
                    fullimage(imageId, description)
                });
            });
        }
        return 0
    });
}

saerchButton.addEventListener('click', () => {
    query = input.value;
    if (!(query === '')) {
        imagesContainer.innerHTML = '';
        images(pageNumber)
        showMore.style.display = 'block'
    }
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        query = input.value;
        if (!(query === '')) {
            imagesContainer.innerHTML = '';
            images(pageNumber)
            showMore.style.display = 'block'
        }
    }
});
    
showMore.addEventListener('click', () => {
    pageNumber += 1;
    images(pageNumber)
})


    

function fullimage(imageId,description){
        
        const frame = document.getElementById("frame");
        frame.style.display = 'block'
        const closeButton = document.getElementById("close-button");
    const image = document.getElementById("image");
    const heading = document.querySelector('.head')
        closeButton.addEventListener("click", () => {
            frame.style.display = "none";
        });
    image.src = `${imageId}`;
    image.alt = `${description}`
    heading.textContent = `${description}`
    
}