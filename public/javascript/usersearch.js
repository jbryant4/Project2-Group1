 async function searchUser (event) {

event.preventDefault();

const userName = document.querySelector('#user-search').value.trim();
console.log(userName);
if (userName) {
    const response = await fetch('/api/users/' + userName, {
        method: 'get',
        
    });

    if (response.ok) {
        console.log(response);
       
       response.json().then(data =>  document.location.replace('/profile/' + data.id))
    } else {
        alert(response.statusText);
    }
}
}

document.querySelector('#userSearch').addEventListener('click', searchUser);

