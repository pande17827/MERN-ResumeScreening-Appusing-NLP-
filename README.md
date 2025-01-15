# MERN Resume Screening App using NLP

![App Screenshot](https://github.com/pande17827/MERN-ResumeScreening-Appusing-NLP-/raw/main/screenshots/app_screenshot.png)

## Overview

The MERN Resume Screening App is a web application designed to automate the process of screening resumes by leveraging Natural Language Processing (NLP) techniques. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this application streamlines recruitment by efficiently analyzing and categorizing resumes based on their content.

## Features

- 📝 **Automated Resume Parsing**: Extracts relevant information from uploaded resumes.
- 🤖 **NLP-Based Analysis**: Utilizes NLP to evaluate and categorize resumes.
- 🖥️ **User-Friendly Interface**: Intuitive design for easy navigation and use.
- ⚡ **Real-Time Processing**: Quickly processes resumes to provide immediate feedback.
- 📈 **Scalability**: Built with the MERN stack to ensure scalability and performance.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pande17827/MERN-ResumeScreening-Appusing-NLP-.git
   cd MERN-ResumeScreening-Appusing-NLP-
   ```

2. **Install server dependencies**:

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**:

   - Create a `.env` file in the `server` directory.
   - Add the following variables:

     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

5. **Run the application**:

   - Start the server:

     ```bash
     cd ../server
     npm start
     ```

   - Start the client:

     ```bash
     cd ../client
     npm start
     ```

6. **Access the application**:

   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. 📂 **Upload Resume**: Navigate to the upload section and submit a resume in PDF or DOCX format.
2. 🔍 **View Analysis**: After uploading, the app will display the parsed information and categorize the resume based on its content.
3. 📋 **Review Recommendations**: Receive suggestions to improve the resume's alignment with desired job roles.

## Technologies Used

- 🌐 **Frontend**: React.js, HTML5, CSS3, JavaScript
- 🖧 **Backend**: Node.js, Express.js
- 🗄️ **Database**: MongoDB
- 📚 **Natural Language Processing**: Python's NLTK library
- 🚀 **Deployment**: Docker, Kubernetes

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/pande17827/MERN-ResumeScreening-Appusing-NLP-/blob/main/LICENSE) file for details.

## Acknowledgements

- 📖 [Natural Language Toolkit (NLTK)](https://www.nltk.org/)
- 📚 [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
- 🐳 [Docker Documentation](https://docs.docker.com/)
- ☸️ [Kubernetes Documentation](https://kubernetes.io/docs/home/)

## Contact

For any inquiries or feedback, please contact [pande17827](https://github.com/pande17827).

