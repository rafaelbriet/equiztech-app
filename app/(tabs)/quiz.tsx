import AppContext from "@/components/AppContext";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, RadioButton, Text } from "react-native-paper";

export default function Quiz() {
    const {category_id, category_name} = useLocalSearchParams();
    const {token} = useContext(AppContext);
    const [quiz, setQuiz] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState('');

    async function fetchQuiz() {
        try {
            const params = new URLSearchParams({
                id_categoria: category_id[0]
            });
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/partida/quiz.php/?' + params.toString(), {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token,
                },
            });
            const data = await response.json();
            setQuiz(data.perguntas);
        } catch (error) {
            console.error(error);
        } finally {

        }
    }

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1);
        setSelected('');
    }

    useEffect(() => {
        setCurrentQuestion(0);
        setSelected('');
        (async () => await fetchQuiz())();
    }, []);

    if (quiz.length === 0) {
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
        )
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text variant="headlineLarge">{category_name}</Text>
            <Text>Pergunta {currentQuestion + 1} de {quiz.length}</Text>
            <Text variant="titleMedium" style={{ marginTop: 32 }}>{quiz[currentQuestion].texto_pergunta}</Text>
            <RadioButton.Group onValueChange={ value => setSelected(value) } value={selected}>
                {quiz[currentQuestion].respostas.map((element: any) => {
                    return (
                        <RadioButton.Item  label={element.texto_alternativa} value={element.id} position='leading' labelStyle={{ textAlign: 'left' }} />
                    )
                })}
            </RadioButton.Group>
            {currentQuestion + 1 === quiz.length ? (
                <Button mode="contained" disabled={selected === '' ? true : false}>Encerrar</Button>
            ) : (
                <Button mode="contained" onPress={nextQuestion} disabled={selected === '' ? true : false}>Continuar</Button>
            )}
        </View>
    );
}