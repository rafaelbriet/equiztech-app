import AppContext from "@/components/AppContext";
import { Link, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function GameOver() {
    const param: any = useLocalSearchParams();
    const matchDetails = JSON.parse(param.match);
    const {token} = useContext(AppContext);
    const [corrects, setCorrects] = useState(0);

    async function saveMatch() {
        try {
            const requestBody = {
                partida: matchDetails
            }
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/partida/encerrar.php/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token,
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async function verifyAnswers() {
        let totalCorrects = 0;

        matchDetails.respostas.forEach(async (element: any) => {
            try {
                const params = new URLSearchParams({
                    id: element.id_pergunta
                });
                const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/perguntas/?' + params.toString(), {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": 'Bearer ' + token.token,
                    },
                });
                const data = await response.json();
                const answerFromDB = data.pergunta.respostas.find((a: any)=> a.id == element.id_resposta_escolhida);
                
                if (answerFromDB.correta == true) {
                    totalCorrects = totalCorrects + 1;
                    setCorrects(totalCorrects);
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    useEffect(() => {
        (async () => await verifyAnswers())();
        (async () => await saveMatch())();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text variant="headlineLarge" style={{ textAlign: 'center' }}>Você respondeu</Text>
            <Text variant="displayLarge" style={{ textAlign: 'center', fontWeight: 'bold' }}>{corrects}/{matchDetails.respostas.length}</Text>
            <Text variant="headlineMedium" style={{ textAlign: 'center' }}>perguntas corretamente</Text>
            <Link href='/(tabs)/categories' style={{ marginTop: 32 }} asChild>
                <Button mode='contained'>Jogar Novamente</Button>
            </Link>
            <Link href='/(tabs)/' style={{ marginTop: 16 }} asChild>
                <Button mode='text'>Voltar para o inicio</Button>
            </Link>
        </View>
    );
}