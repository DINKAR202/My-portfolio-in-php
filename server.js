const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/contact_form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Schema and Model definitions
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const FormEntry = mongoose.model('FormEntry', formSchema);

// Handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    try {
      const newFormEntry = new FormEntry({
        name,
        email,
        subject,
        message,
      });
  
      const savedEntry = await newFormEntry.save();
  
      res.status(201).json({
        message: 'Form data saved successfully!',
        savedEntry: savedEntry,
      });
    } catch (error) {
      res.status(500).json({
        error: 'An error occurred while saving the form data.',
      });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
