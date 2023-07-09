# Filmtab-server

Directory containing server-side application for [FilmTab project](https://github.com/r1pk/filmtab). FilmTab server is written in Node.js and uses the [Colyseus](https://colyseus.io/) framework.

## Project structure

```bash
server/                 # root directory
├─ src/                 # application source code
│  ├─ rooms/            # room related files grouped by room type
│  ├─ app.config.js     # server configuration
│  ├─ index.js          # application entry point
│  ├─ logger.js         # logger configuration
├─ .env.development     # local development configuration
```

Files outside of `src` directory are mostly configuration files for git, editor and npm.

## Environment Variables

To run the application locally, you might need to change the following configuration in specific files:

- `.env.development` - Default configuration used by the local development server.
- `.env.[environment]` - Configuration used by the server in specific environment. `[environment]` is the name of the environment set in `NODE_ENV` variable.

Default configuration:

```bash
NODE_ENV=development         # node environment
COLYSEUS_MONITOR_PASSWORD=   # password for colyseus monitor
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/filmtab.git
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm start
```

## Room types

### Video-Room

#### Room state schema

- [Schema definition](./src/rooms/video-room/schemas/RoomState.js)

#### Events listened by server

- `video::set_url` - sets video url.  
  Accepts object with `url` field which is a string with url to the video.

  ```javascript
  {
    url: string;
  }
  ```

- `video::play` - plays video.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```javascript
  {
    progress: number;
  }
  ```

- `video::pause` - pauses video.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```javascript
  {
    progress: number;
  }
  ```

- `video::toggle_playback` - toggles video playback.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```javascript
  {
    progress: number;
  }
  ```

- `video::seek` - seeks video.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```javascript
  {
    progress: number;
  }
  ```

- `video::set_subtitles` - sets subtitles.  
  Accepts object with `subtitles` field which is a string with valid WebVTT subtitles.

  ```javascript
  {
    subtitles: string;
  }
  ```

- `video::delete_subtitles` - deletes subtitles.  
  Accepts empty object.

  ```javascript
  {
  }
  ```

- `video::request_progress` - requests current video progress. This event requires at least one client except the one who sent it to be connected to the room otherwise it will be ignored.
  Accepts empty object.

  ```javascript
  {
  }
  ```

- `video::latest_progress` - video progress sent to this event will be broadcasted to all clients who requested current video progress with `video::request_progress` event.
  Accepts object with `progress` field which is a number with current progress of the video.

  ```javascript
  {
    progress: number;
  }
  ```

- `chat::message` - sends received message to all users in the room.  
  Accepts object with `content` field which is a string with message content.

  ```javascript
  {
    content: string;
  }
  ```

#### Events emitted by server

- `video::request_progress` - notification that someone requested current video progress.  
  This event is emitted every time someone requests it with `video::request_progress` event and there is at least one other client connected.
  Payload sent with this event is empty object.

  ```javascript
  {
  }
  ```

  Every user that receives this event should respond with `video::latest_progress` event.

- `video::latest_progress` - sends current progress of the video received from fastest user.  
  Payload sent with this event is object with `progress` field which is a number with current progress of the video.

  ```javascript
  {
    progress: number;
  }
  ```

  This event is sent only to users that requested current progress with `video::request_progress` event and there is at least one other client connected.

- `chat::message` - chat message received from other user.  
  Payload sent with this event is object with `id`, `content`, `createdAt`, `author` fields.

  ```javascript
  {
    id: string,
    content: string,
    createdAt: number,
    author: {
      id: string,
      username: string,
      color: string
    }
  }
  ```

#### Client communication

Communication between client and server is done using [Colyseus.js](https://www.colyseus.io/) framework which notifies every client about changes in room state.

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk
