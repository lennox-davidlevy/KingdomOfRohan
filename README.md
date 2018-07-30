# Moodvie

Serving you movies based on your mood


## Team

  - __Product Owner__: Parker Muir
  - __Scrum Master__: Martin Glyer
  - __Development Team Members__: Frank Corkery, Kiernen Hahn

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

#### Global Search

Note: This feature is usable without signing up or logging in to the site.

Simply select from our list of provided moods. Should you wish to search by more than one mood, click the "Add Mood" button.  You may search by up to 3 moods.

You will be returned 5 movies from our database.  These are the top movies that our users have tagged with the moods you input.

#### Profile Page

After signing up or logging in, you will be directed to your profile.  If this is your first time logging in, there will be a search bar where you can type in a movie you have seen.  Select the correct movie after your search by clicking the "Rate This Movie" button.

You will be shown the movie poster, and may tag it with as many moods that you feel apply to the movie from the drop down menu as you would like.  Once satisfied, hit the "Submit" button.

This movie will then be saved to your history of movies, and your tags added to our database...helping other visitors find the movies they want!

#### Recommendations Bar

An unused component (client/components/RecList.jsx) and function (server/controllers/serverhelpers.js, filterRecs) that displays a list of movies based on the most recent 'mooded' movie by a user that does not include any of the movies that user has already seen.  

## Requirements

- Axios
- Body-Parser
- Express
- Mongoose
- React
- React-dom
- React-router-dom

## Development

### Front End Routes (React Router)

Nav - The Nav bar has a conditional render depending on if a user is currently logged in or not. This flag is managed int he state of index.jsx with the loggedIn state.

If a user is not logged in, the Nav bar will display Login and Sign Up buttons. A user will not be able to access the Profile link, which will redirect to login.

If a user is logged in the Nav bar will have a Logout button in place of Login/Signup.

BrowserRouter (inside index.js) - The Nav bar is always displayed outside of the Switch. Inside the Switch the potential routes are:

'/' - redirects users to GlobalSearch regardless of authentication. User should be able to query moodvies as soon as possible.

'/global' - the Nav bar name for the GlobalSearch component. User does not have to be logged in to use global search.

'/profile' - a logged in User's profile. Inside this component the User can query for movies they have seen and add tags to them. They can also view their history. If a user is not logged in this route will redirect to '/login'

'/login' - this route shows the login page, however once the page re-renders and the loggedIn state has been updated to true it will Redirect the user to their profile page.

'/signup' - this route shows the signup page, however similar to login, once the page re-renders with a new loggedIn state, it will redirect a signed up user to their profile during that render.

'/logout' - this route will redirect a user to the login page

Page Refreshes - at the bottom of the server/index.js file there is an express route that handles all of the potential GET requests that could be made by a user trying to refresh a page with an endpoint assigned by React Router. All of these refreshes are handled by redirecting the user to the root page which is ultimately then redirected to '/global'.

### Installing Dependencies

From within the root directory:

```sh
npm install
```
