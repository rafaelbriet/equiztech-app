import { View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/components/AppContext';
import { router, useNavigation } from "expo-router";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function Index() {
    const {token, setToken} = useContext(AppContext);
    const [logoutDialogAction, setLogoutDialogAction] = useState({} as any);

    if (token == null) {
        console.log('needs token');
        router.replace('/sign-in');
    }

    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);

    function showDialog() {
        setVisible(true);
    }

    function hideDialog() {
        setVisible(false);
        setLogoutDialogAction({});
    }

    function logout() {
        setToken(null);
        const action = logoutDialogAction;
        setLogoutDialogAction({});
        router.replace('/');
        navigation.dispatch(action)
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            showDialog();
            // navigation.dispatch(e.data.action);
            setLogoutDialogAction(e.data.action);
        })
    }, [])
    
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text>{JSON.stringify(token)}</Text>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Você deseja sair do app?</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Você será desconectado do aplicativo.</Text>
                        <Text>Para voltar a jogar será necessário realizar o login novamente.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancelar</Button>
                        <Button onPress={logout}>Sair</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}