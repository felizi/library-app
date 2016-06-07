var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

// Configura um local de arquivos estáticos (como CSS e JS).
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index', {list: ['a','b']});
});

app.get('/books', function(req, res) {
    res.send('Hello books');
});

app.listen(port, function(err) {
    console.log('Running server on port ' + port);
});
