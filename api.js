export async function fetchImages(page, limit, query) {
    try {
        let url = `http://localhost:3000/images?_page=${page}&_limit=${limit}`;
        if (query) {
            url += `&q=${query}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        return images;
    } catch (error) {
        console.error(error);
        return [];
    }
}
