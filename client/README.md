# Filmtab-client

Filmtab-client is a responsive web application written in [React](https://reactjs.org/), allowing users to watch videos synchronously in private rooms from various streaming services.  
Application is built using [Vite](https://vitejs.dev/), [Redux](https://redux.js.org/), [React Router](https://reacttraining.com/react-router/) and [Material UI](https://mui.com/).

## Screenshots

Home page
![Home page](https://i.imgur.com/epCuUVR.png)

Room page with playing video
![Room page](https://i.imgur.com/aBbfYxp.png)

## Pre-requisites

- [node.js v16+ or higher](https://nodejs.org/en/)
- [npm v8.0 or higher](https://nodejs.org/en/download/)

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
VITE_BASE_APP_TITLE=FilmTab              # Application title used as a prefix for the document title
VITE_COLYSEUS_URL=                       # Colyseus server address

VITE_USERNAME_LOCALSTORAGE_KEY=username  # Local storage key used to store username
```

Run the app in development mode

```bash
npm run dev
```

After running the application, open `localhost:5173` in your browser.

Build the app for production to the `build` folder

```bash
npm run build
```

## Project structure

```bash
public                            # static files
src
   |-- api                        # api related folders and files
   |   |-- group                  # group of files related to a single api
   |   |   |-- index.js           # exports main api instance from the folder
   |-- components                 # grouped components used in the application
   |   |-- group                  # group of components
   |-- features                   # feature based modules
   |   |-- feature                # feature module
   |   |   |-- components         # components used in the feature
   |   |   |-- constants          # constants used across the feature
   |   |   |-- utils              # utility functions used in the feature components
   |   |   |-- index.js           # exports components from the feature
   |-- hooks                      # custom hooks used mostly in the page components
   |-- layouts                    # app layouts
   |   |-- layout                 # single layout
   |   |   |-- index.js           # exports main layout component from the folder
   |-- pages                      # page components
   |-- redux                      # redux related files
   |   |-- slices                 # redux toolkit store slices
   |   |-- store.js               # initializes redux store
   |   |-- index.js               # exports redux related files from the folder
   |-- themes                     # theme related files used in the application
   |   |-- dark.js                # dark theme object used in the application
   |-- App.jsx                    # main application component
   |-- AppRoutes.jsx              # available routes in the application
   |-- main.jsx                   # entry point of the application
.env                              # file containing environment variables
```

## Live Demo

Application is automatically deployed using Vercel.

[Live demo](https://filmtab.vercel.app)

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

- [MIT](https://choosealicense.com/licenses/mit/)
