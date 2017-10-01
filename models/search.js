const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
   searchTerm: String,
   date: { type: Date, default: Date.now }
}, { capped: { size: 1024, max: 10, autoIndexId: true } });

const Search = mongoose.model('search', searchSchema);

module.exports = Search;