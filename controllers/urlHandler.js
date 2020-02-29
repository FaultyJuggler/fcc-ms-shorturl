const ShortUrl = require( './shortUrl' );
const UrlEntry = require( '../models/urlEntry' );

function processShortUrl( req, res )
{
  const shUrl = req.params.shUrl.toString();
  UrlEntry.findOne( {shortURL: shUrl}, ( err, data ) =>
  {
    if( err ) return;
    if( data )
    {
      // redirect to the stored page
      res.redirect( data.originalURL );
    } else
    {
      res.json( {'error': 'No short url found for given input'} );
    }
  } );
}

async function addEntry( req, res )
{
  const ogUrl = req.body.url;
  const shUrl = await ShortUrl.getNext();

  const newEntry = new UrlEntry( {
    originalURL: ogUrl,
    shortURL: shUrl,
  } );

  await newEntry.save();

  res.json( newEntry.toJSON() );
}

module.exports = {
  addEntry,
  processShortUrl,
};