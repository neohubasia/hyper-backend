require("dotenv").config();

module.exports = {
  HOST: process.env.APP_HOST,
  PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  app: {
    NAME: "hyper | dashboard",
    FILE: "hyper-market-file",
    DESC: "business  solution for general purpose",
    icons: {
      FLAT_PLUS: "/images/icons/flat-plus.svg",
      FLAT_EDIT: "/images/icons/flat-edit.svg",
      FLAT_DELETE: "/images/icons/flat-delete.svg",
      FLAT_DETAIL: "/images/icons/flat-detail.svg",
    },
    DATABASE: process.env.DATABASE_NAME,
    PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY,
  },
  mongo: {
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
  },
  jwt: {
    TEXT: "9E0HU8L48",
    HASH: "SHA256",
    SECRET: "C57B465081874C256CFD78D9EC226DCD111D03E08E21ABB8DCAF0CF7DA71D362",
    credential: {
      USERNAME: "N3OXUBL1SN0T633K",
      PASSWORD: "ZOZO.4U6.1ST.8D",
    },
  },
};
