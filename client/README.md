# Filmtab-client

Filmtab-client is a responsive application written in React which uses tools such as [Redux](https://redux.js.org/), [Styled Components](https://styled-components.com/), [Material UI](https://mui.com/getting-started/usage/) and [Colyseus.js](https://www.colyseus.io/). Filmtab-client allows you to sychronically watch videos with your friends after you create or join a room.

## Screenshots

Home page
![Home page](https://i.imgur.com/0t5RnVw.png)

Room page with playing video
![Video player page](https://i.imgur.com/nD4oYRw.png)

## Pre-requisites

- [node.js v14.0 or higher](https://nodejs.org/en/)
- [npm v7.0 or higher](https://nodejs.org/en/download/)

## Installation

Clone Filmtab-client repository

```bash
git clone https://github.com/r1pk/filmtab-client.git master
```

Install all dependencies

```bash
cd ./master
npm install
```

Before running the application, configure the environment variables to provide the application with [server](https://github.com/r1pk/filmtab-server) address

```env
EXTEND_ESLINT=true                   # react environment variable to allow eslint rules to be extended
REACT_APP_COLYSEUS_ENDPOINT=ADDRESS  # address of colyseus.js server
```

Run the app in development mode

```bash
npm start
```

Build the app for production to the `build` folder

```bash
npm run build
```

## Project structure

```bash
public                     # folder containing static files such as index.html
src
   |-- components          # all the components that are used in application
   |   |-- Component       # a component folder that can contain smaller components
   |   |-- Shared          # components that are used by other components
   |-- containers          # components that are connected to the redux store
   |-- hooks               # custom hooks used by some components
   |-- pages               # folder containing a page template composed of components and containers
   |-- actions             # action type constants and action creators for redux
   |-- reducers            # reducers and initial states for redux
   |-- middleware          # custom middleware used in app
   |-- store.js            # file that creates a store from all reducers and middlewares
   |-- FilmTabRouting.js   # file containing app routing
   |-- FilmTab.js          # file containing additional stuff that affect the behavior of the entire app
   |-- index.js            # starting point to render app and provide app connection to redux store
.env                       # file containing environment variables
```

## Live Demo

Application is automatically deployed using Vercel.

[Live demo](https://filmtab.vercel.app)

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

- [MIT](https://choosealicense.com/licenses/mit/)
