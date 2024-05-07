const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const photoRouter = require('./routes/photos');

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/photo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Configure Multer for image uploads
const upload = multer({
    dest: path.join(__dirname, 'uploads') // Define upload directory
});

// Serve static files from the `uploads` directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use photoRouter for photo-related API endpoints
app.use('/photos', photoRouter);

const port = process.env.PORT || 5000; // Use environment variable or default port

app.listen(port, () => console.log(`Server listening on port ${port}`));

