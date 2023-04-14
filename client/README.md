# Filmtab-client

Filmtab-client is a responsive web application written in [React](https://reactjs.org/), allowing users to watch videos synchronously in private rooms from various streaming services.  
Application is built using [Vite](https://vitejs.dev/), [Redux](https://redux.js.org/), [React Router](https://reacttraining.com/react-router/) and [Material UI](https://mui.com/).

## Screenshots

Home page
![Home page](https://i.imgur.com/epCuUVR.png)

Room page with playing video
![Room page](https://i.imgur.com/aBbfYxp.png)

## Pre-requisites

FilmTab was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

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
   |-- apis                       # api related folders and files
   |   |-- group                  # files grouped by specific api
   |   |   |-- index.js           # exports main api instance
   |-- components                 # components used across the application
   |   |-- group                  # components grouped by their purpose
   |-- features                   # feature based modules
   |   |-- feature                # resources grouped by the feature
   |   |   |-- components         # feature components
   |   |   |-- constants          # feature constants
   |   |   |-- utils              # feature utils
   |   |   |-- index.js           # exports resources from the feature folder
   |-- hooks                      # hooks used across the application
   |-- layouts                    # application layouts
   |   |-- layout                 # layout components grouped by their purpose
   |   |   |-- index.js           # exports main layout component from the folder
   |-- pages                      # page components
   |-- redux                      # redux related files
   |   |-- slices                 # redux toolkit store slices
   |   |-- store.js               # store configuration
   |   |-- index.js               # exports redux related resources from the folder
   |-- themes                     # theme related files
   |   |-- base.js                # base style object containing common styles
   |   |-- dark.js                # dark theme object
   |-- App.jsx                    # main application component
   |-- AppRoutes.jsx              # available routes in the application
   |-- main.jsx                   # entry point of the application
.env                              # file containing environment variables
```

## Live demo

Application is automatically deployed using Vercel.

[Live demo](https://filmtab.vercel.app)

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

- [MIT](https://choosealicense.com/licenses/mit/)
