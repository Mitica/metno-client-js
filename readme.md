# metno nodejs client

## Usage
```
var client = require('metno-client');
client.getWeather({
  params: {lat: 20.123, lon: 43.232},
  request: {timeout: 1000}
}, function(error, report){
  // got weather report
});
```

## API

### .api.ENDPOINT(options, callback)

ny.no api endpoint call.

### .getWeather(options, callback)

Returns a weahter report

- **options**:
  - **params**:
    - **lat** - latitude,
    - **lon** - longitude
  - *version* - api version
  - *request* - request options
- **callback** - function(error, data)
