import AppContext from "@/components/AppContext";
import { Link, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, Divider, Text } from "react-native-paper";

export default function GameOver() {
    const param: any = useLocalSearchParams();
    const matchDetails = JSON.parse(param.match);
    const quiz = JSON.parse(param.quiz);
    const {token} = useContext(AppContext);
    const [corrects, setCorrects] = useState(0);
    const [correctedQuiz, setCorrectedQuiz] = useState({} as any);
    const [isCorrecting, setIsCorrecting] = useState(false);
    const hasMatchBeenSaved: any = useRef(false);

    async function saveMatch() {
        if (hasMatchBeenSaved.current) {
            return;
        }

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

            if (data.erro) {
                
            } else {
                hasMatchBeenSaved.current = true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function verifyAnswers() {
        try {
            setIsCorrecting(true);
            const requestBody = {
                respostas: matchDetails.respostas
            }
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/perguntas/corrigir.php/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            
            if (data.erro) {
                console.error(data.erro.mensagem);
            } else {
                setCorrects(data.total_respostas_corretas);
                setCorrectedQuiz(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsCorrecting(false);
        }
    }

    function getChosenAnswer(question: any): string {
        let chosenAnswerId = correctedQuiz.respostas.find((element: any) => element.id_pergunta == question.id).id_resposta;
        let chosenAnswerText = question.respostas.find((element: any) => element.id == chosenAnswerId).texto_alternativa;
        return chosenAnswerText;
    }

    function isQuizAnsweredCorrectly(question: any): boolean {
        let chosenAnswer = correctedQuiz.respostas.find((element: any) => element.id_pergunta == question.id);
        return chosenAnswer.correta == 1;
    }

    useEffect(() => {
        (async () => await verifyAnswers())();
        (async () => await saveMatch())();
    }, []);

    if (isCorrecting) {
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
                padding: 16,
                marginTop: 64
            }}
        >
            <Text variant="headlineLarge" style={{ textAlign: 'center' }}>Você respondeu</Text>
            <Text variant="displayLarge" style={{ textAlign: 'center', fontWeight: 'bold' }}>{corrects}/{matchDetails.respostas.length}</Text>
            <Text variant="headlineMedium" style={{ textAlign: 'center' }}>perguntas corretamente</Text>
            
            <ScrollView style={{ marginTop: 16 }}>
                {quiz.perguntas.map((element: any) => {
                    return (
                        <Card style={{ marginBottom: 16 }}>
                            <Card.Title
                                title={element.texto_pergunta}
                                titleNumberOfLines={10}
                                left={(props) => <Avatar.Icon {...props} icon={isQuizAnsweredCorrectly(element) ? 'check' : 'close' } />}
                            />
                            <Card.Content>
                                <Text variant='titleSmall'>Sua Resposta:</Text>
                                <Text variant='bodyMedium' style={{ marginBottom: 8 }}>{getChosenAnswer(element)}</Text>
                                <Text variant='titleSmall'>Resposta Correta:</Text>
                                <Text>{element.respostas.find((x: any) => x.correta == 1).texto_alternativa}</Text>
                                <Divider style={{ marginTop: 12, marginBottom: 12 }} />
                                <Text variant='titleSmall'>Explicação:</Text>
                                <Text variant='bodyMedium'>{element.explicacao}</Text>
                            </Card.Content>
                        </Card>
                        
                    );
                })}
            </ScrollView>

            <Link href='/(tabs)/categories' style={{ marginTop: 32 }} asChild>
                <Button mode='contained'>Jogar Novamente</Button>
            </Link>
            <Link href='/(tabs)/' style={{ marginTop: 16 }} asChild>
                <Button mode='text'>Voltar para o inicio</Button>
            </Link>
        </View>
    );
}