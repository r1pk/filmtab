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
   |-- commands         # folder containing grouped commands for a given type of room
   |-- utils            # folder contains utils functions used in many files
   |-- rooms            # folder contains definitions of room classes
   |-- schemas          # folder contains state definitions for rooms
   |-- arena.config.js  # server definition by colyseus/arena
   |-- logger.js        # file contains definition and config of the module responsible for logs
   |-- index.js         # start point
```

## Room types

Currently the server supports only one type of room

### Video-Room

#### Room state schema

```
room schema {
  users: Map {
    name: string - username
    color: string - user color in hsl format
  }
  video: {
    url: string - address to the currently playing video
    playing: boolean - status of the currently set video
    progress: number - number of seconds that elapsed from the beginning of the video (until the last update)
    updateTimestamp: number - time at which a video object was changed by, for example, a play/pause action
  }
}
```

#### Available native methods

- onCreate(options) - called if user create a room

  ```
    options {

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

#### Events listened by the server

- `video::set`
  ```
    message {
      url: string - address of the video that should be set for the whole room
    }
  ```
- `video::play`
  ```
    message {
      progress: number - number of seconds passed since the beginning of the video
    }
  ```
- `video::pause`
  ```
    message {
      progress: number - number of seconds passed since the beginning of the video
    }
  ```
- `video::seek`
  ```
    message {
      progress: number - number of seconds passed since the beginning of the video
    }
  ```
- `video::current_progress`
  ```
    message {
      progress: number - current progres of the video
    }
  ```
- `chat::message`
  ```
    message {
      content: string - message with a maximum length of 140 characters.
    }
  ```

#### Events emitted by the server

- `video::current_progress`
  ```
    message {
      progress: number - number of played seconds received from the fastest response
      updateTimestamp: number - time at which the event was sent
    }
  ```
  Event is sent to the new users who have joined the room where the video is currently playing to synchronize the progress of the video.
- `video::request_progress`
  ```
    message {
    }
  ```
  Event is emitted only after new user has joined the room. It is used to request inform users that they should send their current progress of the video in
  the previous `video::current_progress` event. Event is emitted to all users in the room except the user who just joined.
- `chat::message`
  ```
    message {
      id: string - unique id
      author: User {
        name: string - username of the author
        color: string - user color in hsl format
      }
      content: string - content of the message
      timestamp: number - time at which the server received the message
    }
  ```
  Event publishes a previously received message to which necessary data such as id, author, timestamp have been added.

#### Client communication

Communication with the clients in the room is performed mainly by updating the room state which is later synchronized for each client by Colyseus.js. The exceptions to the above rule are the three events described below.

- `video::request_progress` - Event is emitted only after new user has joined the room. It is used to request inform users that they should send their current progress of the video in the previous `video::current_progress` event.
- `video::current_progress` - Event sends current progress of the video to the client.
- `chat::message` - Event sends the parsed message that was received from a single client to every client in that room.

## Server monitor

The filmtab-server also has a configured monitor provided from the `@colyseus/monitor` package which is available at `{SERVER_IP}:{SERVER_PORT}/colyseus` url.
The monitor starts only if an admin has assigned authorization data in environment variables (`MONITOR_ADMIN_USERNAME` and `MONITOR_ADMIN_PASSWORD`).

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

- [MIT](https://choosealicense.com/licenses/mit/)
