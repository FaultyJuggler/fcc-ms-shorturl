const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

module.exports = mongoose.model( 'UrlEntry', urlEntrySchema );

const urlEntrySchema = new Schema( {
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
} );