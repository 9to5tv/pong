import Pusher from 'pusher-js';
import { PUSHER_KEY, SERVER_AUTH_URL, CHANNEL_NAME } from './constants';

const pusher = new Pusher(PUSHER_KEY, {
  cluster: 'us2',
  encrypted: true,
  authEndpoint: SERVER_AUTH_URL
});

const channel = pusher.subscribe(CHANNEL_NAME);

channel.bind('pusher:subscription_succeeded', function() {
  console.log('connected');
});

export const subscribe = (eventName, cb) => channel.bind(eventName, cb);