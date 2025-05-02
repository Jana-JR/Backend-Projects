const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('./redis');

const store = new RedisStore({
  client: redisClient,
  prefix: "sess:", // optional: custom prefix
});

module.exports = session({
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: '__Secure-auth',
  cookie: {
    secure: process.env.PRODUCTION === 'true',
    httpOnly: true,
    sameSite: 'lax',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
});
