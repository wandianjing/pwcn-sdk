/**
 * Created by tonghema on 23/11/2017.
 */
var pingpp = require('./pwcn')('123456');
pingpp.charges.retrieve('5a168138aa16c41e24573c9c', '5a168138aa16c41e24573c9c', function (err, data) {
    console.log(err);
    console.log(data);
})