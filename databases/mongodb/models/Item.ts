var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    description: { type: String, maxLength: 256 },
    checked: { type: Boolean}

});

module.exports = mongoose.model('Item', ItemSchema);