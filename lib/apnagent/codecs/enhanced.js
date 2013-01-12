/*!
 * Module dependancies
 */

var lotus = require('lotus');

/**
 * .reader
 *
 * Enhanced Apple Push Notifications protocol.
 * See APN documents for the specification.
 *
 * @api public
 */

exports.reader = lotus.reader()
  .u32be('identifier')
  .u32be('expiry')
  .u16be('tokenLen')
  .take('tokenLen', 'deviceToken')
  .u16be('payloadLen')
  .take('payloadLen', 'payload', 'utf8', JSON.parse);

/**
 * .writer
 *
 * Enhanced Apple Push Notifications protocol.
 * See APN documents for the specifications.
 *
 * @api public
 */

exports.writer = lotus.writer()
  .u32be('identifier')
  .u32be('expiry')
  .u16be(function (msg) {
    return msg.deviceToken.length;
  })
  .push('deviceToken')
  .u16be(function (msg) {
    var payload = JSON.stringify(msg.payload);
    return Buffer.byteLength(payload, 'utf8');
  })
  .write('payload', 'utf8', JSON.stringify);
