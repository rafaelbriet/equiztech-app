import { ScrollView, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/components/AppContext';
import { Link, router, useNavigation } from "expo-router";
import { ActivityIndicator, Avatar, Button, Card, Dialog, Portal, Text } from "react-native-paper";
import UserProfileContext from "@/components/UserProfileContext";

export default function Index() {
    const {token, setToken} = useContext(AppContext);
    const [logoutDialogAction, setLogoutDialogAction] = useState({} as any);
    const {userProfile, isUserProfileLoaded} = useContext(UserProfileContext)
    const [achievements, setAchievement] = useState({} as any);
    const [isFetchingAchievements, setIsFetchingAchievements] = useState(true);

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

    async function fetchAchievements() {
        setIsFetchingAchievements(true);

        try {
            const params = new URLSearchParams({
                id_usuario: userProfile.usuario.id
            });
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/conquistas/?' + params.toString(), {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token,
                },
            });
            const data = await response.json();
            
            if (data.erro) {
                console.error(data.erro);
            } else {
                setAchievement(data);
                console.log('achievements fetched');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log('achievements length: ' + Object.keys(achievements).length);
        
        if (Object.keys(achievements).length > 0) {
            setIsFetchingAchievements(false);
            console.log('achievements loaded:');
            console.log(achievements);
        }
    }, [achievements])

    useEffect(() => {
        console.log('isUserProfileLoaded:' + isUserProfileLoaded);
        if (isUserProfileLoaded) {
            console.log('fetching Achievements');
            console.log(userProfile);
            
            (async () => await fetchAchievements())();
        }
    }, [isUserProfileLoaded]);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            showDialog();
            // navigation.dispatch(e.data.action);
            setLogoutDialogAction(e.data.action);
        })
    }, [])
    
    if (isFetchingAchievements) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 16
                }}
            >
                <ActivityIndicator animating={true} />
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>Olá, {userProfile.usuario.nome}</Text>
            <Text variant="headlineLarge" style={{ marginBottom: 16 }}>Conquistas</Text>

            <ScrollView>
                <Card style={{ marginBottom: 16 }}>
                    <Card.Title title="Total de partidas" left={(props) => <Avatar.Icon {...props} icon="play" />} />
                    <Card.Content>
                        <Text>Você já jogou {achievements.conquistas.total_partidas} quizes.</Text>
                    </Card.Content>
                </Card>

                <Card style={{ marginBottom: 16 }}>
                    <Card.Title title="Total de respostas" left={(props) => <Avatar.Icon {...props} icon="checkbox-multiple-marked" />} />
                    <Card.Content>
                        <Text>Você já respondeu {achievements.conquistas.total_respostas} perguntas.</Text>
                    </Card.Content>
                </Card>

                <Card style={{ marginBottom: 16 }}>
                    <Card.Title title="Total de respostas corretas" left={(props) => <Avatar.Icon {...props} icon="star" />} />
                    <Card.Content>
                        <Text>Você já respondeu {achievements.conquistas.total_respostas_correta} perguntas corretamente.</Text>
                    </Card.Content>
                </Card>

                <Card style={{ marginBottom: 16 }}>
                    <Card.Title title="Maior quantidade de partidas em um dia" left={(props) => <Avatar.Icon {...props} icon="playlist-play" />} />
                    <Card.Content>
                        <Text>Você jogou {achievements.conquistas.maior_quantidade_partida_dia} partidas em um único dia.</Text>
                    </Card.Content>
                </Card>

                <Card style={{ marginBottom: 16 }}>
                    <Card.Title title="Maior sequência de dias jogados" left={(props) => <Avatar.Icon {...props} icon="calendar-multiple-check" />} />
                    <Card.Content>
                        <Text>Você jogou {achievements.conquistas.maior_sequencia_dia_jogados} dias seguidos.</Text>
                    </Card.Content>
                </Card>
            </ScrollView>

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