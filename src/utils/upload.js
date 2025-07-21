const multer = require('multer');
const path = require('path');

// Carpeta de destino temporal
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // asegúrate de que exista esta carpeta
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
