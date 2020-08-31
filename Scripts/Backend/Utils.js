const crypto = require('crypto');

/**
 * @method sha256
 * @description Builds a hash code to encrypt passwords
 * @param {array} 
 * @returns {}
 */
const sha256 = (secret) => crypto
    .createHmac('sha256', secret)
    .digest('hex');

module.exports = { sha256 };