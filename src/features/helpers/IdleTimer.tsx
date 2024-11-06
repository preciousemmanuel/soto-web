// src/components/IdleTimer.jsx
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const IdleTimer = ({ timeout = 120000 }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const showWarningToast = useCallback(() => {
    toast({
      title: 'Session Timeout',
      description: 'You have been inactive. Redirecting to home page.',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }, [toast]);

  const resetTimer = useCallback(() => {
    localStorage.setItem('lastActive', Date.now().toString());
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleUserActivity = () => {
      resetTimer();
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        showWarningToast();
        setTimeout(() => {
          navigate('/');
        }, 3000); // Give time for toast to show before redirect
      }, timeout);
    };

    const events = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
      'scroll',
      'click'
    ];

    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    handleUserActivity();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      clearTimeout(timeoutId);
    };
  }, [timeout, navigate, resetTimer, showWarningToast]);

  return null;
};

export default IdleTimer;