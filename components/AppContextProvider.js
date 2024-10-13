import React, { useState } from 'react';
import AppContext from './AppContext';

const AppContextProvider = ({children}) => {
    const [token, setTokenState] = useState(null);

    const setToken = (value) => {
        setTokenState(value);
    }

    return (
        <AppContext.Provider value={{ token, setToken }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;