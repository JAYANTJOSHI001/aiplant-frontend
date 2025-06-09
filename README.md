# AI Planet PDF QA Application

A full-stack application that allows users to upload PDF documents and ask questions about their content using AI.

## Features

- Upload PDF documents
- Ask questions about the content of uploaded PDFs
- Get AI-generated answers based on the document content
- Simple and intuitive user interface

## Tech Stack

### Backend
- FastAPI - Python web framework
- SQLAlchemy - ORM for database operations
- LlamaIndex/LangChain - For document processing and question answering
- PyMuPDF - For PDF text extraction

#### Backend Repository
You can find the backend code here: [Backend Repository](https://github.com/JAYANTJOSHI001/aiplanet-backend)


### Frontend
- React.js - JavaScript library for building user interfaces
- Material-UI - React component library
- Axios - HTTP client for API requests

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm 6+

### Backend Setup
1. Navigate to the backend directory:
```plaintext
cd backend
```

2. Create a virtual environment:
```plaintext
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
  ```
  venv\Scripts\activate
  ```
- macOS/Linux:
  ```
  source venv/bin/activate
  ```

4. Install dependencies:
```plaintext
pip install -r requirements.txt
```

5. Run the server:
```plaintext
uvicorn main:app --reload
```

### Frontend Setup
1. Navigate to the frontend directory:
```plaintext
cd frontend
```

2. Install dependencies:
```plaintext
npm install
```

3. Start the development server:
```plaintext
npm start
```

## API Documentation

The API documentation is available at `http://localhost:8000/docs` when the backend server is running.

### Endpoints

- `POST /documents/` - Upload a PDF document
- `GET /documents/` - Get a list of uploaded documents
- `POST /chat/ask` - Ask a question about a document

## Architecture
The application follows a client-server architecture:

1. The frontend (React) provides the user interface for uploading documents and asking questions.
2. The backend (FastAPI) handles document processing, storage, and question answering.
3. When a document is uploaded, it's stored on the server and indexed for efficient querying.
4. When a question is asked, the backend uses LlamaIndex to search the document and generate an answer.


## Usage
1. Upload a PDF document by clicking the "Upload" button and selecting the desired file.
2. Ask questions about the content of the uploaded PDF by typing them in the input field and clicking the "Ask" button.
3. Get AI-generated answers to your questions.

## Project Structure
aiplanet/
├── backend/
│   ├── app/
│   │   ├── main.py - FastAPI application
│   │   ├── models.py - Database models
│   │   ├── database.py - Database connection
│   │   ├── routers/ - API endpoints
│   │   └── services/ - Business logic
│   └── requirements.txt - Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ - Reusable UI components
│   │   ├── pages/ - Application pages
│   │   ├── services/ - API client
│   │   └── App.js - Main application component
│   └── package.json - JavaScript dependencies
└── README.md - Project documentation

This implementation provides a complete solution for the AI-powered PDF question answering application based on the requirements and design provided. The application allows users to upload PDF documents, ask questions about their content, and receive AI-generated answers.

The backend uses FastAPI with LlamaIndex for document processing and question answering, while the frontend uses React with Material-UI for a clean and intuitive user interface that matches the provided design.

