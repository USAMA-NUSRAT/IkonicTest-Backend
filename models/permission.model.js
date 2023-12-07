const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
});

const permissionModel = mongoose.model("Permission", permissionSchema);

module.exports = permissionModel;
