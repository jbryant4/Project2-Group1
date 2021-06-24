async function searchUser(event) {

    event.preventDefault();

    const userName = document.querySelector('#user-search').value.trim();
    console.log(userName);
    if (userName) {
        const response = await fetch('/api/users/' + userName, {
            method: 'get',
        });

        if (response.ok) {
            console.log(response);

            response.json().then(data => {
                console.log(data)
                if (data === null) {
                    const err = document.createElement('p')
                    err.innerHTML = 'User is not Found';
                    document.querySelector('#search-err').appendChild(err)
                } else {
                    document.location.replace('/profile/' + data.id)
                }

            })
        }
    }
}

document.querySelector('#userSearch').addEventListener('click', searchUser);

