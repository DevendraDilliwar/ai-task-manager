const dotenv = require('dotenv');
const path = require('path');
require('colors');

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('✅ Environment variables loaded successfully.'.green);