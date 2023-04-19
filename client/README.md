# FilmTab

FilmTab is a responsive web application that allows users to watch videos together at the same time and provides a way for users to communicate with each other using a text chat feature. FilmTab is built using technologies such as [React](https://reactjs.org/), [React-Router](https://reactrouter.com), [Redux](https://redux.js.org/), [Material-UI](https://mui.com/).

## Screenshots

Home page
![Home page](https://i.imgur.com/epCuUVR.png)

Room page with playing video
![Room page](https://i.imgur.com/aBbfYxp.png)

## Pre-requisites

Application was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
VITE_BASE_APP_TITLE=FilmTab              # Base application title
VITE_COLYSEUS_URL=                       # Colyseus server address

VITE_USERNAME_LOCALSTORAGE_KEY=username  # Local storage key used to store username
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/filmtab-client.git
```

Go to the project directory

```bash
  cd filmtab-client
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm run dev
```

## Project file structure

```bash
public                            # static files
src
   |-- apis                       # api related folders and files
   |-- components                 # components used across the application
   |   |-- common                 # common components used across the application
   |   |-- group                  # components grouped by their purpose
   |-- configs                    # configuration files
   |-- hooks                      # hooks used across the application
   |-- layouts                    # application layouts
   |   |-- layout                 # layout components grouped by their purpose
   |-- pages                      # page components
   |-- redux                      # redux related files
   |   |-- slices                 # redux toolkit store slices
   |   |-- store.js               # store configuration
   |   |-- index.js               # exports redux related resources from the folder
   |-- themes                     # theme related files
   |   |-- base.js                # base style object containing common styles
   |   |-- dark.js                # dark theme object
   |-- utils                      # utility functions used across the application
   |-- App.jsx                    # main application component
   |-- AppRoutes.jsx              # available routes in the application
   |-- main.jsx                   # entry point of the application
.env                              # file containing environment variables
```

## Demo

Application is automatically deployed using Vercel.

[FilmTab Live Demo](https://filmtab.vercel.app/)

## Authors

- [@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
