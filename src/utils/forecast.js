const request = require("request");

const forecast = ( {latitude , longitude} , callback ) => {

  const url = `https://api.darksky.net/forecast/b877d409b16c89f34485c726f9d463a7/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (err, {body}) => {
    if (err) {
      callback( "unable to connect to weather service!", undefined);    
    }
    else if (body.error) {
      callback("unable to find location!", undefined);    
    }
    else {
      const temperature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;
      const daily = body.daily;
      callback(
        undefined,
        `${daily.summary} its currently ${temperature} degrees, there is a ${precipProbability} chance of rain`
      );        
    }

  });
};

module.exports = forecast;