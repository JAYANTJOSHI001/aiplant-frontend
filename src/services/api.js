import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDocuments = async () => {
  try {
    const response = await api.get('/documents/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const askQuestion = async (documentId, question) => {
  try {
    const response = await api.post('/chat/ask', {
      document_id: documentId,
      question,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;