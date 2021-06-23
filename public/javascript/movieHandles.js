async function movieSearch(event) {
    event.preventDefault();

    const movieTitle = document.querySelector('#search-movie').value.trim()

    const response = await fetch('/api/movies/' + movieTitle, {
        method: 'get',
    });

    if (response.ok) {

        response.json().then(data => { console.log(data) })


    } else {
        alert(response.statusText);
    }
}

document.querySelector('#search-btn').addEventListener('click', movieSearch);