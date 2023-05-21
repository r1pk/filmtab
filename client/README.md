# FilmTab-client

Directory containing client-side application for [FilmTab project](https://github.com/r1pk/filmtab). FilmTab client is built using technologies such as [React](https://reactjs.org/), [React-Router](https://reactrouter.com), [Redux](https://redux.js.org/), [Material-UI](https://mui.com/).

## Screenshots

Home page
![Home page](https://i.imgur.com/OCYZmGd.png)

Room page with playing video
![Room page](https://i.imgur.com/ZDWpL4f.png)

## Project structure

```bash
client/               # root directory
├─ public/            # static files
├─ src/               # application source code
│  ├─ apis/           # api related files
│  ├─ components/     # reusable components grouped by features
│  ├─ configs/        # configuration files
│  ├─ hooks/          # custom hooks
│  ├─ layouts/        # layout components grouped by layout type
│  ├─ pages/          # page components
│  ├─ redux/          # redux related files
│  ├─ themes/         # theme related files (e.g. colors, fonts)
│  ├─ utils/          # utility functions
│  ├─ App.jsx         # application root component
│  ├─ AppRoutes.jsx   # application routes
│  ├─ main.jsx        # application entry point
├─ .env               # default environment variables
```

## Environment Variables

To run the application locally, you might need to change the following configuration in specific files:

- `.env.local` - Configuration used by the local development server.
- `.env` - Configuration used by default and will be used as fallback if some variables are not defined in `.env.local`.

Default configuration:

```bash
VITE_BASE_APP_TITLE=FilmTab          # Base application title
VITE_COLYSEUS_URL=                   # Colyseus server address

VITE_USERNAME_STORAGE_KEY=username   # Username storage key
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/filmtab.git
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm run dev
```

## Authors

- [@r1pk](https://github.com/r1pk)
