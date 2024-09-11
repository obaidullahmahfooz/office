const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes will be added here
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
