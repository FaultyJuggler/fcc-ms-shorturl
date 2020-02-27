const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

module.exports = mongoose.model( 'Counter', counterSchema );

const counterSchema = new Schema( {
  count: {
    type: Number,
    required: true,
    default: 0,
  },
} );