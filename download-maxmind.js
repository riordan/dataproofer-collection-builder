const fs = require('fs');
const download = require('download');

download('http://geolite.maxmind.com/download/geoip/database/GeoLite2-City-CSV.zip', 'downloads', extract=true);
