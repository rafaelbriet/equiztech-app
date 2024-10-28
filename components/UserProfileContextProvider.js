import React, { useContext, useEffect, useState } from 'react';
import UserProfileContext from './UserProfileContext';
import AppContext from './AppContext';

const UserProfileContextProvider = ({children}) => {
    const [userProfile, setUserProfile] = useState({});
    const {token} = useContext(AppContext);

    async function getCurrentUser() {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/usuarios/me.php', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token
                },
            });
            const data = await response.json();
            
            if (data.erro) {
                console.error(data.erro);
            } else {
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadUserProfile() {
        const currentUser = await getCurrentUser();
        
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/perfil/?id_usuario=' + currentUser.usuario.id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token
                },
            });
            const data = await response.json();
            
            if (data.erro) {
                console.error(data.erro);
            } else {
                setUserProfile(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => await loadUserProfile())();
    }, []);

    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    )
};

export default UserProfileContextProvider;