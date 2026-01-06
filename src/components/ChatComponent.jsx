import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Send message to backend for processing by Care AI
  const sendMessage = async () => {
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/chat', {
        userInput: message,
        userId: 'patient-uid-001', // Replace with actual user ID from authentication
      });

      setChatHistory([
        ...chatHistory,
        { sender: 'Patient', message: message, timestamp: new Date() },
        { sender: 'Care AI', message: response.data.response, timestamp: new Date() },
      ]);

      setMessage(''); // Clear message input after sending
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Care AI</h2>
      <div style={styles.chatBox}>
        {chatHistory.length === 0 ? (
          <p style={styles.emptyMessage}>Start a conversation...</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              style={{
                ...styles.chatMessage,
                ...(chat.sender === 'Care AI' ? styles.careAIMessage : styles.patientMessage),
              }}
            >
              <strong>{chat.sender}:</strong>
              <p>{chat.message}</p>
              <small>{new Date(chat.timestamp).toLocaleTimeString()}</small>
            </div>
          ))
        )}
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputContainer}>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={styles.input}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  chatBox: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    height: '300px',
    overflowY: 'auto',
    marginBottom: '15px',
    backgroundColor: 'white',
  },
  chatMessage: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  patientMessage: {
    backgroundColor: '#e3f2fd',
    borderLeft: '4px solid #2196F3',
  },
  careAIMessage: {
    backgroundColor: '#f3e5f5',
    borderLeft: '4px solid #9c27b0',
  },
  emptyMessage: {
    color: '#999',
    textAlign: 'center',
    marginTop: '120px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  error: {
    color: '#d32f2f',
    marginBottom: '10px',
  },
};

export default ChatComponent;
