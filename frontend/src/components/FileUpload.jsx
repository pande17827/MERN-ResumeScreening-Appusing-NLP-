import { useState } from 'react';
import axios from 'axios';
import style from './FileUpload.module.css';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Track processing state

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('ProfileImage', selectedFile);

        setIsUploading(true); // Disable button during upload
        setIsProcessing(false); // Reset processing state
        setCategory(null); // Reset category before uploading new one

        try {
            // Upload the file to the Express backend
            const uploadResponse = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // After file upload, set processing to true
            setIsProcessing(true);

            // Once the file is uploaded, request the predicted category
            const predictionResponse = await axios.post('http://localhost:8000/predict', {
                fileName: uploadResponse.data.fileName,
            });

            // Set the predicted category once processing is complete
            setCategory(predictionResponse.data.category);
        } catch (error) {
            console.error('Error during file upload or prediction:', error);
        } finally {
            setIsUploading(false); // Re-enable button after upload/prediction
        }
    };

    return (
        <div className={style.uploadContainer}>
            <h1>Upload Your Resume</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className={style.fileInput} 
                    accept=".pdf, .docx, .txt"
                />
                <button 
                    type="submit" 
                    className={style.submitButton}
                    disabled={isUploading} // Disable button when uploading
                >
                    {isUploading ? "Uploading..." : "Upload & Predict"}
                </button>
            </form>

            {isUploading && <div className={style.loader}></div>} {/* Loading spinner */}

            {isProcessing && !category && (
                <div className={style.processingContainer}>
                    <p className={style.processingText}>Processing... Please wait</p>
                </div>
            )}

            {category && 
                <div className={style.categoryContainer}>
                    <p className={style.category}>Predicted Category:</p>
                    <div className={style.categoryCard}>
                        <span className={style.categoryText}>{category}</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default FileUpload;
