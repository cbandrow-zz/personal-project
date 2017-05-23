var express = require('express');
var app = express();

app.use(express.static('app'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Car-Tographer'

app.listen(app.get('port'), function () {
   console.log(`${app.locals.title} is running on ${app.get('port')}`)
})
