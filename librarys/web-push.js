const config = require("../config/index");
const webpush = require("web-push");

// VAPID keys should be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();

// webpush.setGCMAPIKey('AAAAL8Qj1Qk:APA91bFsviSbOcr22B3-3V4tJoN0gqrYQI-lPVb-QCcO153f8bmM85cfyHrMcfKXeUIbeuVUIdUyEIsIV2-QYrhAXUhuKjke4sgpbsvJNk6EyWFFd08-zfaS4NdKbi1tS8qMMXmoEsJr');

webpush.setVapidDetails(
  "mailto:waiphyo.dev@gmail.com",
  config.app.PUBLIC_VAPID_KEY,
  config.app.PRIVATE_VAPID_KEY
);

module.exports = webpush;
