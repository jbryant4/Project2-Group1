# Project2-Group1

## Idea name: myMovieList presented by Joseph Bryant
## USER STORY
As a user i want to be able to create,compair and like custom movie list made by multiple users,
So that i can see what everyone has been watching during quaintine.

### Setup Idea

Make it so that users can search for a movie using a third party api(options below)

#### movie api website
https://www.themoviedb.org/settings/api
this might be freaking awesome for the api
https://github.com/grantholle/moviedb-promise

http://www.omdbapi.com/

free key gets 1000 a day

this might be freaking awesome for the api
https://github.com/grantholle/moviedb-promise

Or if the user could not find the movie on the search they could add one to our db themselves

#### Models

User: 
  id  
  username
  email
  password

List:
  id
  list genre
  list name
  

Movies:
  id:
  title:
  rating:
  year of release:
  director:
  etc etc ettc (really whatever data we need)
  list_id

Votes: 
  id
  user_id
  list_id
  
If we want we can add comments or change upvote to like a number rating system:
Also note the more models we have the more association and crud routes we will need

#### Views

Login Page/Welcome page: 
 - Where user can log in and are greeted with a message or a video of how the app works
Homepage:
  - will be a list of current list made by the user (sortable by most like/genre/most recent)
  - will have a nav bar 
User Page
  - user will see there own list made 
  - when clicking on a list it will take them to the list editing/delete page 
  - will also have a make a list button 
  - (bonus have an area where the app shows you a recomended movie section)
Make a list Page
  -will make searches or add manuelly movies
Edit/Delete list page 
  - can remove movies from list 
  - can delete list 
  - can rename list or change genre


### Conclusion
This might look like a lot but this is really what we are doing in modules 13 and 14 just adding a 3rd party api call in the mix with our group we should be able to knock this out of the park plus there are a lot of cool features we could add to the mix




  
