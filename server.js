var express = require('express');
var app = express();
var webpackDevHelper = require('./index.dev.js');

app.use(express.static('app'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Car-Tographer'

if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    webpackDevHelper.useWebpackMiddleware(app);
} else {
    console.log('PRODUCTION ENVIRONMENT');
    //Production needs physical files! (built via separate process)
    app.use('/js', express.static(__dirname + '/public/js'));
}

app.listen(app.get('port'), function () {
   console.log(`${app.locals.title} is running on ${app.get('port')}`)
})

// app.start(3000)
