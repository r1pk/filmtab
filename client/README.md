# Filmtab-client

Filmtab-client is a responsive application written in React which uses tools such as [Redux](https://redux.js.org/), [Material UI](https://mui.com/getting-started/usage/) and [Colyseus.js](https://www.colyseus.io/). FilmTab is a web application that allows users to watch movies together in real time.

## Screenshots

Home page
![Home page](https://i.imgur.com/nEXiVku.png)

Room page with playing video
![Room page](https://i.imgur.com/TNK5M9H.png)

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
VITE_BASE_APP_TITLE=FilmTab   # Application title used as a prefix for the document title
VITE_COLYSEUS_URL=            # Colyseus server address
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
   |-- components                 # grouped components used in the application
   |   |-- group_name             # group of components
   |   |-- index.js               # exports all available components as named exports
   |-- features                   # feature based modules
   |   |-- feature_name           # feature module
   |   |   |-- components         # components used in the feature
   |   |   |-- schemas            # schemas used in the feature forms
   |   |   |-- options            # options used across the feature
   |   |   |-- utils              # utility functions used in the feature components
   |   |   |-- index.js           # exports components from the feature
   |-- hooks                      # custom hooks used mostly in the page components
   |   |-- index.js               # exports hooks from the folder
   |-- layouts                    # app layouts
   |   |-- layout_name            # layout
   |   |-- index.js               # exports layouts from the folder
   |-- pages                      # page components
   |-- providers                  # providers used to wrap the application
   |   |-- index.js               # exports providers from the folder
   |-- redux                      # redux related files
   |   |-- middlewares            # middlewares used in the redux store
   |   |   |-- middleware_name    # middleware
   |   |   |  |-- index.js        # exports middleware and actions from the folder
   |   |-- slices                 # redux toolkit store slices
   |   |-- store.js               # initializes redux store
   |   |-- index.js               # exports redux related files from the folder
   |-- routes                     # routes used in the application
   |   |-- components             # helper components used in the routes
   |   |-- common-routes.js       # routes available for all users
   |   |-- protected-routes.js    # routes available for users that are room members
   |   |-- public-routes.js       # routes available for users that are not room members
   |   |-- AppRoutes.jsx          # creates routes for the app
   |   |-- index.js               # exports files from the folder
   |-- theme                      # theme related files used in the application
   |   |-- theme.js               # theme object used in the application
   |   |-- index.js               # exports theme from the folder
   |-- App.jsx                    # main application component
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
