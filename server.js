const express = require('express');
const app = express();
var cors = require('cors');
const server = require('http').Server(app);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './renderer' });
const handle = nextApp.getRequestHandler();
require('dotenv').config();
const connectDb = require('./utilsServer/connectDb');

connectDb();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', require('./routes/api/auth'));
app.all('*', (req, res) => handle(req, res));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// nextApp.prepare().then(() => {

// app.use('/api/users', require('./routes/api/users'));
//   server.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`Server started on ${PORT}`);
//   });
// });
