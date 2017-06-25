var express = require('express');
var app = express();
var webpackDevHelper = require('./index.dev.js');

app.use(express.static('app'));

// app.get('/',
//   function(req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'))
//   })

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Car-Tographer'

if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    webpackDevHelper.useWebpackMiddleware(app);
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')

    const config = require('./webpack.config.js')
    const compiler = webpack(config)

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPatch: config.output.publicPath,
    }))
} else {
    console.log('PRODUCTION ENVIRONMENT');
    //Production needs physical files! (built via separate process)
    app.use('/js', express.static(__dirname + '/public/js'));
}

app.listen(app.get('port'), function () {
   console.log(`${app.locals.title} is running on ${app.get('port')}`)
})

// app.start(3000)
