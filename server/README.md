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
   |-- commands         # folder contains commands used in room class
   |-- helpers          # folder contains helper functions used in many files
   |-- rooms            # folder contains definitions of room classes
   |-- schemas          # folder contains state definitions for rooms
   |-- arena.config.js  # server definition by colyseus/arena
   |-- index.js         # start point
```

## Room types

Currently the server supports only one type of room

### Video-Room

Room state schema

```
room schema {
  users: Map {
    name: string - username
  }
  video: {
    url: string - address to the currently playing video
    playing: boolean - status of the currently set video
    playedSeconds: number - number of seconds that elapsed from the beginning of the video (until the last update)
    updateTimestamp: number - time at which a video object was changed by, for example, a play/pause action
  }
}
```

Available native methods

- onCreate(options) - called if user create a room
  ```
    options {
      private: boolean - true if the room should be private
    }
  ```
- onJoin(client, options) - called if user wants to join a room
  ```
    client - websocket client provided by colyseus.js
    options {
      username: string - name of the user who is going to join the room
    }
  ```
- onLeave(client) - called if user leaves the room
  ```
    client - websocket client provided by colyseus.js
  ```
- onDispose() - called if room is empty

Available message types

- `video::set`
  ```
    message {
      url: string - address of the video that should be set for the whole room
    }
  ```
- `video::play`
  ```
    message {
      playedSeconds: number - number of seconds passed since the beginning of the video
    }
  ```
- `video::pause`
  ```
    message {
      playedSeconds: number - number of seconds passed since the beginning of the video
    }
  ```
- `video::seek`
  ```
    message {
      playedSeconds: number - number of seconds passed since the beginning of the video
    }
  ```
  Server emits only one event `video::currentPlayedSeconds` to the user who joined the room
- `video::currentPlayedSeconds`
  ```
    message {
      currentPlayedSeconds: number - calculated number of played seconds based on timestamp and played seconds from last action
      updateTimestamp: number - time at which the event was sent
    }
  ```
  The purpose of this method is to send the current played seconds to the user who joined while the video is playing.

#### Client communication

communication with the client is performed through room state updates which are automatically sent to each user in the room via Colyseus.js, the only exception is the `video::playedSeconds` event which is sent by the server to the user who joined the room.

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

- [MIT](https://choosealicense.com/licenses/mit/)
