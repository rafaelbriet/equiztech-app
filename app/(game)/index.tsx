import AppContext from "@/components/AppContext";
import UserProfileContext from "@/components/UserProfileContext";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Dialog, Portal, RadioButton, Text } from "react-native-paper";

export default function Quiz() {
    const {category_id, category_name} = useLocalSearchParams();
    const {token} = useContext(AppContext);
    const {userProfile} = useContext(UserProfileContext);
    const [quiz, setQuiz] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState('');
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [quitQuizDialogAction, setQuitQuizDialogAction] = useState({} as any);
    const questionAnswer: any = useRef([]);
    const matchDetails: any = useRef(
        {
            id_usuario: null,
            iniciada_em: null,
            encerrada_em: null,
            fuso_horario: null,
            respostas: []
        }
    );
    
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

    function endQuiz() {
        matchDetails.current.id_usuario = userProfile.usuario.id;
        matchDetails.current.encerrada_em = getNowFormatted();
        matchDetails.current.respostas = questionAnswer.current;
        router.replace({ pathname: '/(game)/game-over', params: { match: JSON.stringify(matchDetails.current), quiz: JSON.stringify({perguntas: quiz}) } });
    }

    function startQuiz() {
        questionAnswer.current = [];
        matchDetails.current.iniciada_em = getNowFormatted();
        matchDetails.current.fuso_horario = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setCurrentQuestion(0);
        setSelected('');
    }

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1);
        setSelected('');
    }

    function addAnswer(question_id: number, answer_id: number) {
        const obj = {
            id_pergunta: question_id,
            id_resposta_escolhida: answer_id
        };
        questionAnswer.current.push(obj);
    }

    function showDialog() {
        setVisible(true);
    }

    function hideDialog() {
        setVisible(false);
    }

    function quitQuiz() {
        const action = quitQuizDialogAction;
        setQuitQuizDialogAction({});
        router.replace('/(tabs)');
        navigation.dispatch(action)
    }

    function getNowFormatted() {
        let now  = new Date();
        let nowFormatted = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        return nowFormatted;
    }

    useEffect(() => {
        startQuiz();
        (async () => await fetchQuiz())();
    }, []);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            let payload: any = e.data.action.payload;

            if (payload?.name == 'game-over') {
                return;
            }

            e.preventDefault();
            showDialog();
            setQuitQuizDialogAction(e.data.action);
        })
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
                        <RadioButton.Item  label={element.texto_alternativa} value={element.id} key={element.id} position='leading' labelStyle={{ textAlign: 'left' }} />
                    )
                })}
            </RadioButton.Group>
            <View style={{ marginTop: 16 }}>
                {currentQuestion + 1 === quiz.length ? (
                    <Button 
                        mode="contained"
                        onPress={() => { addAnswer(quiz[currentQuestion].id, parseInt(selected)); endQuiz(); }} 
                        disabled={selected === '' ? true : false}
                    >
                        Encerrar
                    </Button>
                ) : (
                    <Button 
                        mode="contained"
                        onPress={() => { addAnswer(quiz[currentQuestion].id, parseInt(selected)); nextQuestion(); }} 
                        disabled={selected === '' ? true : false}
                    >
                        Continuar
                    </Button>
                )}
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Sair do quiz?</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Todo o progresso será perdido.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancelar</Button>
                        <Button onPress={quitQuiz}>Sair</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}