const mongoose = require( 'mongoose' );

const urlEntrySchema = new mongoose.Schema( {
      originalURL: {
        type: String,
        required: true,
      },
      shortURL: {
        type: String,
        required: true,
      },
    },
    {
      toObject: {
        transform: function( doc, ret )
        {
          delete ret._id;
          delete ret.__v;
        },
      },
      toJSON: {
        transform: function( doc, ret )
        {
          delete ret._id;
          delete ret.__v;
        },
      },
    } );

module.exports = mongoose.model( 'UrlEntry', urlEntrySchema );