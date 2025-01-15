const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process'); // To run the Python script
const app = express();
const PORT = 8000;

// Set up multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint for file upload
app.post('/upload', upload.single('ProfileImage'), (req, res) => {
    try {
        console.log('Uploaded file:', req.file);

        // After upload, send the file name back to React frontend
        return res.json({ fileName: req.file.filename });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).send('Error uploading file.');
    }
});

// Endpoint to predict the category of the uploaded resume
app.post('/predict', (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).send('File name is required.');
    }

    const filePath = path.join(__dirname, 'uploads', fileName);

    // Explicitly use the full path to Python executable
    const pythonPath = 'C:\\Users\\Pandey\\anaconda3\\python.exe'

    const command = `"${pythonPath}" predict_resume.py "${filePath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error predicting category.');
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error predicting category.');
        }

        console.log(`stdout: ${stdout}`);
        
        // Assuming stdout is the predicted category
        const predictedCategory = stdout.trim();
        return res.json({ category: predictedCategory });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
