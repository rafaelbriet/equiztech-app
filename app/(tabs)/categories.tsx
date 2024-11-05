import AppContext from "@/components/AppContext";
import UserProfileContext from "@/components/UserProfileContext";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function Categories() {
    const [categories, setCategories] = useState<any[]>([]);
    const {token} = useContext(AppContext);

    async function fetchCategories() {
        const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/partida/categorias.php', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Bearer ' + token.token,
            },
        });
        const data = await response.json();
        setCategories(data.categorias);
    }

    useEffect(() => {
        (async () => await fetchCategories())();
    }, [])

    function renderCategory({item}: {item: any}) {
        return (
            <Card style={{ marginBottom: 16 }}>
                <Card.Content>
                    <Text variant="bodyMedium">{item.nome}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => { router.push({ pathname: '/(game)', params: { category_id: item.id, category_name: item.nome }})}}>Começar</Button>
                </Card.Actions>
            </Card>
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
            <Text variant="headlineLarge">Categorias</Text>
            <Text>Para começar um quiz selecione uma categoria.</Text>
            <FlatList data={categories} renderItem={renderCategory} />
        </View>
    );
}