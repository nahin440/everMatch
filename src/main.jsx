import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './router/router.jsx';
import AuthProvider from './components/provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    {/* <div className='max-w-screen-xl mx-auto bg-red-400'> */}
    <RouterProvider router={router} />
    {/* </div> */}
    </QueryClientProvider>
    </AuthProvider>
 
  </StrictMode>
)
