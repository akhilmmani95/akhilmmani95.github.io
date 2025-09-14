const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for content
const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  video: String
});

const Content = mongoose.model('Content', contentSchema);

// Handle form submission
app.post('/submit', (req, res) => {
  const newContent = new Content({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    video: req.body.video
  });

  newContent.save((err) => {
    if (err) {
      res.send('Error saving content');
    } else {
      res.send('Content uploaded successfully');
    }
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
