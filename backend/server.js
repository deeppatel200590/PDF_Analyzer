import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from './middleware/multer.js';
import "dotenv/config.js";
import ai from "./gemini.js";
import fs from 'fs';
let uploadfileid="";

// const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/upload', multer.single('file'), async(req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File uploaded:', req.file);
        const file=await ai.files.upload({
            file:req.file.path,
            config:{
                mimeType: "application/pdf",
            }
        });
        uploadfileid=file.name;
        console.log('File uploaded to Gemini:', uploadfileid);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/chat',(req,res)=>{
    const{question}=req.body;
    res.json({ answer: `This is your question: ${question}` });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});