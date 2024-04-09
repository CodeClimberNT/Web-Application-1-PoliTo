// .mjs means module js and use strict is enabled by default
//'use strict';

// CommonJS - From nodejs
//const dayjs = require('dayjs');

// ES module
import dayjs from 'dayjs';


let now = dayjs();
console.log(now);
console.log(now.format('YYYY-MM-DD'));