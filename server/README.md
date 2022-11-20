# Filmtab-server

Filmtab-server is a server written in [Node.js](https://nodejs.org/en/) using [Colyseus.js](https://www.colyseus.io/) framework for Filmtab application which allows to watch movies synchronously.

## Pre-requisites

- [node.js v14.0 or higher](https://nodejs.org/en/)
- [npm v7.0 or higher](https://nodejs.org/en/download/)

## Installation

Clone Filmtab-server repository

```bash
git clone https://github.com/r1pk/filmtab-server.git master
```

Install all dependencies

```bash
cd ./master
npm install
```

Run server

```bash
npm start
```

## Project structure

```
src
  |-- features            # contains all featured room types
  |  |-- room-type        # contains all files related to room type
  |  |  |-- classes       # contains all classes used in given room
  |  |  |-- commands      # contains all commands related to room type
  |  |  |-- schemas       # contains all schemas for room type
  |  |  |-- index.js      # contains room class export
  |-- arena.config.js     # contains all room definitions and server options
  |-- logger.js           # contains logger config
  |-- index.js            # contains server initialization

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
