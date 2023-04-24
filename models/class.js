const mongoose = require('mongoose');


const classSchema = require('./classSchema');

module.exports = mongoose.model('Class', classSchema);