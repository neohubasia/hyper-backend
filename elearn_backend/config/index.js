require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  app: {
    NAME: "itemplate",
    FILE: "itemplate-file",
    DESC: "business  solution for general purpose",
    icons: {
      FILE_PLUS: "/images/icons/feather-plus.svg",
      TIMES: "/images/icons/feather-times.svg",
      GRID: "images/icons/feather-grid.svg",
      PLUS: "/images/icons/icons8-plus.svg",
      EDIT: "/images/icons/icons8-edit.svg",
      DELETE: "/images/icons/icons8-delete.svg",
    }
  },
  mongo: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW
  },
  pg: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    DATABASE: process.env.PG_DATABASE,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT
  },
  jwt: {
    TEXT: '9E0HU8L48',
    HASH: 'SHA256',
    SECRET: 'C57B465081874C256CFD78D9EC226DCD111D03E08E21ABB8DCAF0CF7DA71D362',
    credential: {
      USERNAME: 'N3OXUBL1SN0T633K',
      PASSWORD: 'ZOZO.4U6.1ST.8D'
    }
  }
}