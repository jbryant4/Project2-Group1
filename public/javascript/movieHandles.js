async function addMovieToDb(movieObject) {

    const response = await fetch('/api/movies', {
        method: 'POST',
        body: JSON.stringify(
            movieObject
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        response.json().then(data => { addMovieToList(data.id) })
    } else {
        alert(response.statusText)
    }
}

async function addMovieToList(movie_id) {
    const list_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/listcontent', {
        method: 'POST',
        body: JSON.stringify({
            list_id,
            movie_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }
}

async function movieApiSearch(data) {

    const response = await fetch('/ombd/' + data, {
        method: 'GET'
    });

    if (response.ok) {
        response.json().then(data => { addMovieToDb(data) })
    } else {
        alert(response.statusText)
    }

}

async function movieSearch(event) {
    event.preventDefault();
    const movieTitle = document.querySelector('#search-movie').value.trim()

    const response = await fetch('/api/movies/' + movieTitle, {
        method: 'get',
    });

    if (response.ok) {
        response.json().then(data => {
            if (data === null) {
                movieApiSearch(movieTitle)
            } else {
                const movieId = data.id;
                addMovieToList(movieId)
            }
        })



    } else {
        alert(response.statusText);
    }
}

async function removeMovie(event) {
    event.preventDefault()


    id = this.getAttribute('movie');
    // console.log(id, typeof id )
    const response = await fetch('/api/listcontent/' + id, {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#search-btn').addEventListener('click', movieSearch);
const dltBtns = document.querySelectorAll('.dlt-btn');

dltBtns.forEach(dltBtn => {
    dltBtn.addEventListener('click', removeMovie);
});