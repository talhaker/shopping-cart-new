var express = require('express');
var app = express();
app.listen(8000);

app.use(express.static(__dirname + 'node_modules'));
app.use(express.static('public'));
app.get('/', function(request, response) {
    response.send("Hello world!");
});

// app.get('/me', function(request, response) {
//     response.send({ name: 'Tal', favouriteFood: 'fish', birthdayGift: 'brains' });
// });

// app.get('/anotherRoute', function(request, response) {
//     response.send("Hey, I'm another route!");
// });