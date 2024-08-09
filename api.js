document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
    const params = {
        page: { number: 1, size: 10 },
        append: ['small_image', 'medium_image'],
        sort: '-published_at'
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${apiUrl}?${queryString}`;

    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
