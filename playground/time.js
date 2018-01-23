const moment = require('moment');

var date = moment();
date.add(1, 'year')
console.log(date.format('MMM D YYYY, h:mm:ss a'));


var someTimestamp = moment().valueOf()
console.log(someTimestamp);
