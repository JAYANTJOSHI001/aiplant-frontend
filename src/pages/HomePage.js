import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import logo from '../assets/Logo.png';

import UploadButton from '../components/UploadButton';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { getDocuments, askQuestion } from '../services/api';
import { IoDocumentOutline } from "react-icons/io5";

const HomePage = () => {
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
      if (docs.length > 0 && !activeDocument) {
        setActiveDocument(docs[0]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleUploadSuccess = (document) => {
    setDocuments([...documents, document]);
    setActiveDocument(document);
    setMessages([]);
  };

  const handleSendMessage = async (message) => {
    if (!activeDocument) return;

    const userMessage = { text: message, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await askQuestion(activeDocument.id, message);
      const aiMessage = { text: response.answer, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Oops! Something went wrong. Try again.', isUser: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', boxShadow:'initial' }}>
      {/* Left Side Panel */}
      <Box
        sx={{
          width: '100%',
          borderRight: isMobile ? 'none' : '1px solid #eee',
          borderBottom: isMobile ? '1px solid #eee' : 'none',
          padding: 3,
          display: 'flex',
          flexDirection: 'row',
          alignContent:'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <img src={logo} alt="AI Planet Logo" height={40} />
        </Box>
        <Box sx={{display:'flex', gap:'20px', justifyContent:'space-between', alignContent:'center'}}>
          {activeDocument ?
          <Box sx={{display:'flex', gap:'10px', justifyContent:'space-between', alignContent:'center'}}>
            <Box sx={{border:'1px solid #0FA95870', borderRadius:'10px', padding:'10px'}}>
              <IoDocumentOutline size={20} color="#0FA958" />
            </Box>
            <Typography variant="subtitle1" gutterBottom sx={{color:'#0FA958', borderRadius:'10px', padding:'10px'}}>
              {activeDocument ? activeDocument.filename : 'demo.pdf'}
            </Typography>
          </Box>
          :
          <></>
          }
          <UploadButton onUploadSuccess={handleUploadSuccess} />
        </Box>
      </Box>

      {/* Right Chat Panel */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f9f9f9',
          height: '100%',
        }}
      >
        {/* Message History */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 3,
          }}
        >
          {messages.length === 0 ? (
            <Typography variant="body1" color="textSecondary" align="center" mt={4}>
              Ask a question about your PDF
            </Typography>
          ) : (
            messages.map((msg, i) => (
              <ChatMessage key={i} message={msg.text} isUser={msg.isUser} />
            ))
          )}
          {loading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </Box>
    </Box>
  );
};

export default HomePage;
