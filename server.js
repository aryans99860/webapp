const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const reportRoutes = require('./model/reportModel');
const { getOperators } = require('./controller/supervisorController');
const { Socket } = require('dgram');
const { log } = require('console');
const server = http.createServer(app);
const io = socketIo(server);
const objectDetectionRouter = require('./router/objectDetectionRouter');
const issueRouter = require('./router/issueRouter');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser'); // Add this line
const jwtAuth = require('./middleware/jwtAuth');

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // Add this line
app.use('/api/reports', require('./router/reportRouter'));
app.use(logger);


io.on('Connection', socket => {
  console.log('client connected');

  const reportChangeStream = Report.watch();
  reportChangeStream.on('change', change => {
    if (change.oprationtype === 'insert' || change.oprationtype === 'update' || change.oprationtype === 'delete') {
      io.emit('reportChange');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});


app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
})


// Routes
app.use('/user', userRouter);
app.use('/api', getOperators);
app.use('/', objectDetectionRouter);
app.use('/submit-issue', issueRouter); // Update this line




// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));



// Serve HTML files from the views directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/b', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'b.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/operator-dashboard',jwtAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'operator-dashboard.html'));
});

app.get('/supervisor-dashboard',jwtAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'supervisor-dashboard.html'));
});

app.get('/editoper', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'editoper.html'));
});

app.get('/editsup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'editsup.html'));
});

app.get('/webcam', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'webcam.html'));
});


app.get('/helpoper', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'helpoper.html'));
});

app.get('/helpsup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'helpsup.html'));
});

app.get('/manualoper', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'manualoper.html'));
});

app.get('/manualsup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'manualsup.html'));
});

app.get('/reportissueoper', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reportissueoper.html'));
});

app.get('/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'report.html'));
});


app.get('/safetyoper', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'safetyoper.html'));
});

app.get('/safetysup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'safetysup.html'));
});

app.get('/trainingoper', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'trainingoper.html'));
});

app.get('/trainingsessionsup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'trainingsessionsup.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://aryan:1234@demoproj.mt0lrmr.mongodb.net/?retryWrites=true&w=majority&appName=DemoProj")
  .then(
    app.listen(PORT, () => {
      console.log("Database Connected ")
      console.log(`Server is running on port ${PORT}`);
    })
)
.catch(e => {
  console.log(e)
})