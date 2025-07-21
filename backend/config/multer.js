// config/multer.js

import multer from 'multer';

// Set up storage
const storage = multer.diskStorage({
  destination: 'uploads', // Make sure this folder exists in your backend root
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
