/**
 * Tool for reading data from D-Link DSP-W215 Home Smart Plug.
 *
 * Usage: enter your PIN code to LOGIN_PWD, change value of HNAP_URL according to your device settings.
 *
 * @type {exports|module.exports}
 */
var soapclient = require('./js/soapclient');
var fs = require('fs');

var OUTPUT_FILE = "result.txt";
var LOGIN_USER = "admin";
var LOGIN_PWD = "066956";
var HNAP_URL = "http://192.168.1.5/HNAP1";
var POLLING_INTERVAL = 600;



var args = process.argv.slice(2);

soapclient.login(LOGIN_USER, LOGIN_PWD, HNAP_URL).done(function (status) {

if (!status) {
  throw "Login failed!";
}
if (status != "success") {
  throw "Login failed!";
}
if (args == "on") {
  soapclient.on();
}
if (args == "off"){
  soapclient.off();
}
if (args == "power"){
  soapclient.consumption().done(function (power) {
    console.log(power);
  });
}
if (args == "total"){
  soapclient.totalConsumption().done(function (power) {
    console.log(power);
  });
}
if (args == "temp"){
  soapclient.temperature().done(function (temperature) {
    console.log(temperature);
  });
}
if (args == "state"){
  soapclient.state().done(function (state) {
    if(state == "true"){
      console.log("ON");
    } else {
      console.log("OFF");
    }
  });;
}

});