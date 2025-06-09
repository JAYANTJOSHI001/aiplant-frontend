import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import logo from '../assets/logoshort.png';


const ChatMessage = ({ message, isUser }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      mb={2}
      width="100%"
    >
      <Avatar
        sx={{
          bgcolor: isUser ? '#6c5ce7' : '#00b894',
          width: 36,
          height: 36,
          mr: 2,
        }}
        src={ !isUser ? logo : undefined}
      >
        {isUser ? 'S' : null}
      </Avatar>
      <Box
        sx={{
          backgroundColor: isUser ? '#f5f6fa' : '#fff',
          borderRadius: '8px',
          padding: '12px 16px',
          maxWidth: '80%',
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;