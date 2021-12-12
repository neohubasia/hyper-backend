var wp = require("../../../../librarys/web-push");

let web_push = (module.exports = {});

web_push.index = (req, res, next) => {
  const subscription = req.body;
  const payload = JSON.stringify({
    title: "hyper marketplace",
    body: "New order is pending to you. Please confirm this order.",
    icon: "http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png",
  });

  res.status(201).json({});

  wp.sendNotification(subscription, payload).catch((error) => {
    console.error(error.stack);
  });
};
