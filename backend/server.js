const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/atelier')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const TrendSchema = new mongoose.Schema({
  color: String,
  category: String,
  count: Number
});

// Model
const Trend = mongoose.model('Trend', TrendSchema);

// Routes
app.get('/trends', async (req, res) => {
  const data = await Trend.find();
  res.json(data);
});

app.post('/trends', async (req, res) => {
  const trend = new Trend(req.body);
  await trend.save();
  res.json(trend);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});