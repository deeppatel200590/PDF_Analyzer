import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from './middleware/multer.js';

// const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/upload', multer.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('File uploaded:', req.file);
    res.status(200).json({ message: 'success' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});