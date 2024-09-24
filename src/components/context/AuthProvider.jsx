import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [apiUrl, setApiUrl] = useState(process.env.VITE_API_URL);

    return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
