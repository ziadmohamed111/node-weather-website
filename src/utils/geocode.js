const request = require("request");

const geocode = (address, callback) => {

  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiemV5YWRtb2hhbWVkIiwiYSI6ImNrNjJmdmJucTA5cXQza280Z2JqM3ZvcnQifQ.F_SDImFe5qIYigqB3EucRg&limit=1`;

  request({ url: geoCodingUrl, json: true }, (err, {body}) => {
    
    if (err) {
      callback("unable to connect to location service", undefined);
    }
    
    else if (body.message) {
      callback("unable to find the location", undefined);
    }
    
    else if (body.features.length === 0) {
      callback("unable to find the location you typed", undefined);
    }
    
    else {
      const data = body.features[0];
      
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name
      });

    }
  });
};

module.exports = geocode