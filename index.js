const CuckooFilter = require('cuckoo-filter').CuckooFilter
const parse = require('csv-parse')
const fs = require('fs')
const transform = require('stream-transform');
let cuckoo= new CuckooFilter(200, 4, 2) // (Size, Bucket Size, Finger Print Size)
let cpipe = cuckoo.add()

var parser = parse({delimiter: ','})
var input = fs.createReadStream('downloads/GeoLite2-City-CSV_20161004/GeoLite2-City-Blocks-IPv4.csv');
var transformer = transform(function(record, callback){
  setTimeout(function(){
    callback(null, record[7]+','+record[8] +'\n');
  }, 500);
}, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(cpipe);

console.log(cuckoo.count) // 1
console.log(cuckoo.reliable) // true less than 95% full
let json = cuckoo.toJSON() // serialize to json object
