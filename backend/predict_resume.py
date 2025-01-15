import sys
import pickle
import docx
import PyPDF2
import re
import os

# Load model, vectorizer, and encoder
svc_model = pickle.load(open('clf.pkl', 'rb'))
tfidf = pickle.load(open('tfidf.pkl', 'rb'))
le = pickle.load(open('encoder.pkl', 'rb'))

# Function to clean resume text
def cleanResume(txt):
    cleanText = re.sub(r'http\S+\s', ' ', txt)  # Handle URLs
    cleanText = re.sub(r'RT|cc', ' ', cleanText)
    cleanText = re.sub(r'#\S+\s', ' ', cleanText)
    cleanText = re.sub(r'@\S+', ' ', cleanText)
    cleanText = re.sub(r'[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]', ' ', cleanText)  # Remove special characters
    cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText)  # Remove non-ASCII characters
    cleanText = re.sub(r'\s+', ' ', cleanText)  # Collapse multiple spaces into one
    return cleanText


# Function to extract text from PDF
def extract_text_from_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)  # Use PyPDF2.PdfReader for newer versions
    text = ''
    for page in pdf_reader.pages:
        text += page.extract_text()  # Extract text page by page
    return text

# Function to extract text from DOCX
def extract_text_from_docx(file):
    doc = docx.Document(file)  # Open the DOCX file
    text = ''
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'  # Append paragraph text
    return text

# Function to extract text from file based on its extension
def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()  # Get file extension
    with open(file_path, 'rb') as file:
        if ext == '.pdf':
            return extract_text_from_pdf(file)
        elif ext == '.docx':
            return extract_text_from_docx(file)
        else:
            raise ValueError("Unsupported file type. Only .pdf and .docx are supported.")

# Main script execution
if __name__ == "__main__":
    try:
        # Get file path from command line arguments
        file_path = sys.argv[1]
        
        # Extract and clean text from the file
        text = extract_text(file_path)
        cleaned_text = cleanResume(text)
        
        # Transform the text into vectorized format
        vectorized_text = tfidf.transform([cleaned_text]).toarray()
        
        # Predict the category
        predicted_category = svc_model.predict(vectorized_text)
        predicted_category_name = le.inverse_transform(predicted_category)
        
        # Print the predicted category
        print(predicted_category_name[0])
    
    except Exception as e:
        print(f"Error: {e}")
