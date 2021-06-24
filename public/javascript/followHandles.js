const followbtn = document.querySelector('#follow');
const unfollowbtn = document.querySelector('#unfollow');
const follow_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

async function followUser() {
    const response = await fetch('/api/follower', {
        method: 'POST',
        body: JSON.stringify({
            follow_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        followbtn.style.display = 'none';
        unfollowbtn.style.display = 'block';
    } else {
        alert(response.statusText);
    }
}

async function unfollowUser() {
    const response = await fetch('/api/follower', {
        method: 'DELETE',
        body: JSON.stringify({
            follow_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {

        followbtn.style.display = 'block';
        unfollowbtn.style.display = 'none';
    } else {
        alert(response.statusText);
    }
}

async function checkFollow() {
    const response = await fetch('/api/follower/' + follow_id, {

    });

    if (response.ok) {
        response.json().then(data => {
            if (data === null) {
                followbtn.style.display = 'block';
                unfollowbtn.style.display = 'none';
            } else {
                followbtn.style.display = 'none';
                unfollowbtn.style.display = 'block';
            }
        })

    } else {
        alert(response.statusText);
    }

}

followbtn.addEventListener('click', followUser);
unfollowbtn.addEventListener('click', unfollowUser);

window.onload = checkFollow