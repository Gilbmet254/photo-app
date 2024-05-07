const express = require('express');
const Photo = require('../models/photo');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Use separate Multer instance for route

const router = express.Router();

// Get all photos (GET /photos)
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload a photo (POST /photos)
router.post('/', upload.single('image'), async (req, res) => {
    const { title } = req.body;
    const imagePath = `/uploads/${req.file.filename}`; // Assuming storage in "uploads" folder

    try {
        const newPhoto = new Photo({
            title,
            image: imagePath
        });
        const savedPhoto = await newPhoto.save();
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
