const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

// Enable CORS for all routes
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   next();
// });

app.use(cors());

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://knowledge-nexus-lime.vercel.app',
//   'https://knowledge-nexus-oi9p6y342-def4lt-303.vercel.app',
//   'https://knowledge-nexus-static.onrender.com'
// ];

// const cors = require('cors');
// const corsOptions = {
//   origin: allowedOrigins,
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// };
// app.use(cors(corsOptions));

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
