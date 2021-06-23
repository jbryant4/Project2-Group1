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

//{{#if loggedIn}}
//<ul>
 //   <label for="userSearchForm">Search for a user</label>
 //   <input type="text" id="user-search" />
   // <button type="submit">Search!</button>
//    <a href="/profile" id="profPageNavLink">Profile Page</a>
//    <a href="/" id="moviesNavLink">Movies</a>
//    <a id="logout">logout</a>
// </ul>
// {{else}}
// <ul>
//    {{!-- I'm assuming here for `listPageBtn` we'll just send the user home if they're not logged in --}}
//    <a href="/" id="moviesNavLink">Movies</a>
//    <a href="/login" id="LoginNavLink">Login or Sign Up!</a>
//</ul>
//{{/if}}