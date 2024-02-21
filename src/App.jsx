import React from 'react';
import RouterComponent from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
    return (
        <ContextProvider> 
            <RouterProvider router={RouterComponent}/>
            <ToastContainer autoClose={2000} />
        </ContextProvider>
    );
};

export default App;