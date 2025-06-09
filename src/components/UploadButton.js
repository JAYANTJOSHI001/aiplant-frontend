import React, { useState } from 'react';
import { Button, CircularProgress, useMediaQuery } from '@mui/material';
import { uploadDocument } from '../services/api';
import {CgAdd} from 'react-icons/cg';


const UploadButton = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      alert('Please upload a PDF file');
      return;
    }

    setLoading(true);
    try {
      const response = await uploadDocument(file);
      onUploadSuccess(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        accept=".pdf"
        style={{ display: 'none' }}
        id="upload-pdf-button"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-pdf-button">
        <Button
          variant="outlined"
          component="span"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{
            borderRadius: '4px',
            padding: '8px 16px',
            textTransform: 'none',
            gap:'10px',
            borderColor: '#000',
            borderWidth:'3px',
            color: '#000',
          }}
        >
          <CgAdd/>
          {!isMobile && (loading ? 'Uploading...' : 'Upload PDF')}
        </Button>
      </label>
    </>
  );
};

export default UploadButton;