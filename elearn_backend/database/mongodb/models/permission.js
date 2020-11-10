const { strict } = require('joi');
const mongoose = require('../connection');

let Schema = mongoose.Schema;
let PermissionSchema = new Schema({
  name: String,
  description: String,
  menu: [
    {
      menu: String,
      submenu: [
        {
          submenu: String,
          access: []
        }
      ]
    }
  ]
}, { strict: false });

let Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;