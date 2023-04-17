# Filmtab-server

Repository contains the server-side application for [Filmtab project](https://github.com/r1pk/filmtab-client). Server is written in Node.js and uses the [Colyseus](https://colyseus.io/) framework.

## Pre-requisites

Application was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
NODE_ENV=development         # node environment
COLYSEUS_MONITOR_PASSWORD=   # password for colyseus monitor
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/filmtab-server.git
```

Go to the project directory

```bash
  cd filmtab-server
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm start
```

## Project structure

```
src
  |-- features            # available room types
  |  |-- room-type        # room directory
  |  |  |-- classes       # classes related to room (mostly room classes)
  |  |  |-- commands      # commands used by given room
  |  |  |-- schemas       # schemas used by given room
  |  |  |-- index.js      # exports main room class
  |-- arena.config.js     # contains and exports created arena config
  |-- logger.js           # logger configuration
  |-- index.js            # server entry point

```

Files outside of `src` directory are mostly configuration files for git, editor and npm.

## Room types

### Video-Room

#### Room state schema

- [Schema definition](./src/features/video-room/schemas/RoomState.js)

#### Events listened by server

- `video::set_url` - sets video url.  
  Accepts object with `url` field which is a string with url to the video.

  ```
  {
    url: string
  }
  ```

- `video::play` - plays video.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```
  {
    progress: number
  }
  ```

- `video::pause` - pauses video.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```
  {
    progress: number
  }
  ```

- `video::toggle_playback` - toggles video playback.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```
  {
    progress: number
  }
  ```

- `video::seek` - seeks video.  
  Accepts object with `progress` field which is a number with current progress of the video.

  ```
  {
    progress: number
  }
  ```

- `video::set_subtitles` - sets subtitles.  
  Accepts object with `subtitles` field which is a string with valid WebVTT subtitles.

  ```
  {
    subtitles: string
  }
  ```

- `video::delete_subtitles` - deletes subtitles.  
  Accepts empty object.

  ```
  {}
  ```

- `video::request_progress` - requests current video progress. This event requires at least one client except the one who sent it to be connected to the room.
  Accepts empty object.

  ```
  {}
  ```

- `video::progress` - video progress sent to this event will be broadcasted to all clients who requested current video progress with `video::request_progress` event.
  Accepts object with `progress` field which is a number with current progress of the video.

  ```
  {
    progress: number
  }
  ```

- `chat::message` - sends received message to all users in the room.  
  Accepts object with `content` field which is a string with message content.

  ```
  {
    content: string
  }
  ```

#### Events emitted by server

- `video::request_progress` - notification that someone requested current video progress.  
  This event is emitted every time someone requests it with `video::request_progress` event and there is at least one other client connected.
  Payload sent with this event is empty object.

  ```
  {}
  ```

  Every user that receives this event should respond with `video::progress` event.

- `video::progress` - Sends current progress of the video received from fastest user.  
  Payload sent with this event is object with `progress` field which is a number with current progress of the video.

  ```
  {
    progress: number
  }
  ```

  This event is sent only to users that requested current progress with `video::request_progress` event.

- `chat::message` - Chat message received from other user.  
  Payload sent with this event is object with `id`, `content`, `createdAt`, `author` fields.

  ```
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

## License

- [MIT](https://choosealicense.com/licenses/mit/)
