import React from 'react';
import RouterComponent from './router';
import { AuthProvider } from './context/auth';

const App = () => {
    return (
        <AuthProvider>
            <RouterComponent />
        </AuthProvider>
    );
};

export default App;