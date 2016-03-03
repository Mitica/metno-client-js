# yrno nodejs client

## Usage
```
var client = require('yrno-client');
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

Data example:
```
{ created: '2016-03-02T20:26:35Z',
  meta: { model: [ [Object], [Object] ] },
  time: 
   [ { datatype: 'forecast',
       from: '2016-03-02T21:00:00Z',
       to: '2016-03-02T21:00:00Z',
       location: [Object] },
     { datatype: 'forecast',
       from: '2016-03-02T20:00:00Z',
       to: '2016-03-02T21:00:00Z',
       location: [Object] },
```
