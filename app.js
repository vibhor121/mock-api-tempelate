document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const searchBar = document.getElementById('search-bar');
    const loading = document.getElementById('loading');

    let page = 1;
    let limit = 10;
    let query = '';

    async function fetchImages(page, limit, query) {
        let url = `http://localhost:3000/images?_page=${page}&_limit=${limit}`;
        if (query) {
            url += `&q=${query}`;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            console.log('Fetched images:', data);  
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function renderImages(images) {
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.download_url;  
            img.alt = image.author;
            gallery.appendChild(img);
        });
    }

    async function loadImages() {
        loading.style.display = 'block';
        const images = await fetchImages(page, limit, query);
        renderImages(images);
        loading.style.display = 'none';
        if (images.length < limit) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    loadMoreBtn.addEventListener('click', () => {
        page++;
        loadImages();
    });

    searchBar.addEventListener('input', debounce(async (e) => {
        query = e.target.value;
        page = 1;
        gallery.innerHTML = '';
        await loadImages();
    }, 300));

    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            page++;
            loadImages();
        }
    });

  
    loadImages();
});
