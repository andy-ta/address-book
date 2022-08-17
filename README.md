# Address Book
Andy Ta

## Requirements

- Node.js

## Local Set-Up

1. `npm install`
2. `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run Tests

```
npm test
```

Launches the test runner in the interactive watch mode.


## Build

```
npm run build
```

Builds the app for production to the `build` folder.


## Deployment

Once the app is built, the static assets can be served via a static asset hosting platform such as Netlify.  

It is currently exists at [https://stalwart-elf-79d3fb.netlify.app/](https://stalwart-elf-79d3fb.netlify.app/)

An alternative would be to serve the files via a Docker container (nginx for example).
This container can be deployed anywhere (example: Cloud platform). 


## Summary

### Your overall approach
I listed the desired features and examined what the API offered.

From these requirements I imagined the "pages" the application: a list of contact and a detail view.

From the API's offering I could determine the fields I would have to show.

Onto development, I started with creating the project using create-react-app, and adding all needing dependencies.

Created a skeleton application with navbar and routing set-up.

Tackled the first feature of listing contacts by setting-up the REST call and loading the results in view.

Implemented sorting the contact list.

Implemented search filtering.

Set-up the routing for the details page and displayed details of the selected contact using the contact's state.

Added some basic happy-path tests for the main features.

Published to GitHub and deployed to Netlify.

### What features you implemented
- List contacts
- View contacts details
- Filter contact list
- Sort contact list

### Given more time, what else would you have liked to complete and how long it would have taken you?
- Star a contact: they will always be listed at the top. ~2-3 hours
- Autocomplete for search filtering + ability to go to details from there. ~2 hours.
- i18n. ~3-4 hours.
- Light/Dark theme. 1 hour.
- Sorting other fields. ~2 hours.
- Display more fields. 1 hour.
- Dynamically seed the random api (hardcoded to 'nuvalence' at the moment, could be passed via url param). 1 hour.

### Given more time, what else would you have done to make the project more robust?
- Issues tracking the features being written
- Display a loading spinner during a REST call
- Error handling and displaying a message during a REST call failure.
- Create smaller components
- Add more tests (not just happy-path)
- Add different types of tests (unit, e2e)
- Set-up store
- Pagination/Infinite scrolling of the contacts
