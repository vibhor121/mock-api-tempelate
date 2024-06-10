const gallery = document.getElementById('gallery');

export function renderImages(images) {
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.author;
        gallery.appendChild(img);
    });
}

export function clearGallery() {
    gallery.innerHTML = '';
}
