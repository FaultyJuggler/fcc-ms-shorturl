'use strict';
// external
const express = require( 'express' );
const mongo = require( 'mongodb' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const getSecret = require( 'docker-secret' ).getSecret;
// import { getSecret } from "docker-secret"
// internal
const urlHandler = require( './controllers/urlHandler' );

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const mongoHost = getSecret( 'MONGO_URI' ) || process.env.MONGO_URI;
console.log( mongoHost );
mongoose.connect( mongoHost,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    } );

app.use( cors() );
app.use( bodyParser.urlencoded( {'extended': false} ) );

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use( '/public', express.static( process.cwd() + '/public' ) );

app.get( '/', function( req, res )
{
  res.sendFile( process.cwd() + '/views/index.html' );
} );

// your first API endpoint...
app.get( '/api/hello', function( req, res )
{
  res.json( {greeting: 'hello API'} );
} );

app.route( '/api/shorturl/:shUrl' ).post( ( req, res ) =>
{
  if( req.params.shUrl === 'new' )
  {
    console.log( 'new short url request' );
    urlHandler.addEntry( req, res );
  }
} ).get( ( req, res ) =>
{
  console.log( 'checking if short url exists' );
  urlHandler.processShortUrl( req, res );
} );

app.listen( port, function()
{
  console.log( 'Node.js listening ...' );
} );