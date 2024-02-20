import React from 'react';
import RouterComponent from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider'; 

const App = () => {
    return (
        <ContextProvider> 
            <RouterProvider router={RouterComponent}/>
        </ContextProvider>
    );
};

export default App;