require('./db/Database');

const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const registerRouter = require('./routes/Register');
const authRouter = require('./routes/Authenticate');

const checkAuth = require('./middlewares/CheckAuth');

const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send('OK');
});

app.use('/api/register', registerRouter);
app.use('/api/authenticate', authRouter);

server.listen(port, function() {
    console.log(`Server is running at port ${port} ...`);
})