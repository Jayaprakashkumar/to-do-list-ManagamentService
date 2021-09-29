var mongoose = require('mongoose');
const schema = mongoose.Schema;

var ListSchema = new schema({
  name: { type: String, required: true, maxLength: 90 },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

module.exports = mongoose.model('List', ListSchema);