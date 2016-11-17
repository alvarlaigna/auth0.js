var windowHelper = require('../helper/window');
var UsernamePassword = require('./username-password');

function Redirect(client, options) {
  this.baseOptions = options;
  this.client = client;
}

Redirect.prototype.login = function (options, cb) {
  var usernamePassword = new UsernamePassword(this.baseOptions);
  return usernamePassword.login(options, function (err, data) {
    if (err) {
      return cb(err);
    }
    usernamePassword.callback(data, {});
  });
};

Redirect.prototype.signupAndLogin = function (options, cb) {
  var _this = this;
  return this.client.dbConnection.signup(options, function (err) {
    if (err) {
      return cb(err);
    }
    _this.login(options, cb);
  });
};

module.exports = Redirect;