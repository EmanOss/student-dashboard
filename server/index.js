const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const announcementRoutes = require('./routes/announcementRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/announcements', announcementRoutes.router);
app.use('/api/quizzes', quizRoutes.router);

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

