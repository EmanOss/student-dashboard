const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// routes
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const quizRoutes = require('./routes/quizRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

// Express app
const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log('Request:', req.method, req.url);
  next();
}
);


// Routes
app.use('/api/auth', authRoutes.router);
app.use('/api/announcements', requireAuth, announcementRoutes.router);
app.use('/api/quizzes', requireAuth, quizRoutes.router);
app.use((req, res, next) => {
  res.status(404).send({ message: 'Not Found' });
});


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB...');
    // Listen to port
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port... ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Error connecting to MongoDB...', err);
  });

