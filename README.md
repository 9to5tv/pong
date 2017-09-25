# Set up

`npm install`

Create `./env.config.js` file:

```js
module.exports = {
  development: {
    PUSHER_KEY: '',
    SERVER_URL: '',
    CHANNEL_NAME: 'private-pong-game-control'
  },
  production: {
    PUSHER_KEY: '',
    SERVER_URL: '',
    CHANNEL_NAME: 'private-pong-game-control'
  }
};
```

# Development

`npm start`

http://localhost:8080/

# Build

`npm run build`
