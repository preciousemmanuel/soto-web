import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider,defaultSystem } from '@chakra-ui/react';
import App from './App';



createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
