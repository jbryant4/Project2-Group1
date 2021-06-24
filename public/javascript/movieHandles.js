async function movieToList(list,movie) {
    // console.log(list,movie)
    const list_id = list;
    const movie_id = movie
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
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

async function movieApiSearch(data) {
    
    const response = await fetch('/ombd/' + data, {
        method: 'GET'
    });

    if (response.ok) {
        response.json().then(data => {console.log(data)})
    } else {
        alert(response.statusText)
    }

}





async function movieSearch(event) {
    event.preventDefault();
    const listId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
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
                movieToList(listId,movieId)
            }
        })



    } else {
        alert(response.statusText);
    }
}

document.querySelector('#search-btn').addEventListener('click', movieSearch);