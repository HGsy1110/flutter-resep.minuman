const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resepController = require('../controllers/resepController');

// Konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Hanya file gambar yang diizinkan!'), false);
    }
    cb(null, true);
  }
});

// Routes
router.get('/', resepController.getAllResep);
router.get('/:id', resepController.getResepById);
router.post('/', upload.single('gambar'), resepController.createResep);
router.put('/:id', upload.single('gambar'), resepController.updateResep);
router.delete('/:id', resepController.deleteResep);

module.exports = router;
