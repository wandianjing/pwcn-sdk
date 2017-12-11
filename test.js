/**
 * Created by tonghema on 23/11/2017.
 */
var pingpp = require('./pwcn')();
pingpp.setPrivateKeyPath(__dirname + '/pingpp_rsa_private_key.pem');

pingpp.company.retrieve('5a1fa8d13cdb698324b188b0', function (err, data) {
    console.log(data);
});


// pingpp.login.token({
//     "appId": "jibc-e8e94fpwkjam48bns",
//     "appSecret": "116167d2784cd464e313b17bcaa2e1f5",
//     "companyId": "5a1fa8d13cdb698324b188b0"
// }, function (err, data) {
//     console.log(err);
//     console.log(data)
// });