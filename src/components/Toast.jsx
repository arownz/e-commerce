import React, { useState, createContext, useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './Toast.css';

// Create context for toast notifications
const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const contextValue = {
    showToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        className="position-fixed p-3" 
        position="top-end" 
        style={{ zIndex: 9999 }}
      >
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            bg={toast.type} 
            className="toast-notification"
            onClose={() => removeToast(toast.id)}
            delay={toast.duration}
            autohide
          >
            <Toast.Header closeButton>
              <strong className="me-auto">
                {toast.type === 'success' && <i className="bi bi-check-circle-fill text-success me-2"></i>}
                {toast.type === 'danger' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}
                {toast.type === 'warning' && <i className="bi bi-exclamation-circle-fill text-warning me-2"></i>}
                {toast.type === 'info' && <i className="bi bi-info-circle-fill text-info me-2"></i>}
                {toast.type === 'success' ? 'Success' : 
                 toast.type === 'danger' ? 'Error' :
                 toast.type === 'warning' ? 'Warning' : 'Information'}
              </strong>
            </Toast.Header>
            <Toast.Body className={toast.type === 'success' ? 'text-white' : ''}>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
