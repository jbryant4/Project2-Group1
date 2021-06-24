async function addListHandler(event) {
    event.preventDefault();
console.log('hi')
    const title = document.querySelector('#new-list').value.trim();
    

    if (title) {
        const response = await fetch('/api/lists', {
            method: 'POST',
            body: JSON.stringify({
                title,
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
    }
}

async function removeList(event) {
    event.preventDefault()


    id = this.getAttribute('list');
    // console.log(id, typeof id )
    const response = await fetch('/api/lists/' + id, {
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

document.querySelector('#search-btn').addEventListener('click', addListHandler);
const dltBtns = document.querySelectorAll('.dlt-btn');

dltBtns.forEach(dltBtn => {
    dltBtn.addEventListener('click', removeList);
});