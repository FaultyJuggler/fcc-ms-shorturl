const Counter = require( '../models/counter.js' );

function getCountAndIncrease( callback )
{
  Counter.findOneAndUpdate( {}, {$inc: {'count': 1}}, function( err, data )
  {
    if( err ) return;
    if( data )
    {
      callback( data.count );
    } else
    {
      const newCounter = new Counter();
      newCounter.save( function( err )
      {
        if( err ) return;
        Counter.findOneAndUpdate( {}, {$inc: {'count': 1}},
            function( err, data )
            {
              if( err ) return;
              callback( data.count );
            } );
      } );
    }
  } );
}

module.exports = {
  getNext,
};

// get a newUrl, force to string
function getNext()
{
  return new Promise( resolve => getCountAndIncrease(
      function( shortUrl )
      {
        resolve( shortUrl.toString() );
      },
  ) );
}