import { Text, View } from "react-native";
import React, {useState, useContext} from 'react';
import { ActivityIndicator, Button, Checkbox, Snackbar, TextInput } from 'react-native-paper';
import { Link, router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from "@/components/AppContext";

export default function Index() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [displayBirthday, setDisplayBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [hasRequestedAccount, setHasRequestedAccount] = useState(false);
    const [requestHasErrors, setRequestHasError] = useState(false);
    const [requestError, setRequestError] = useState({} as any);
    const {token, setToken} = useContext(AppContext);

    async function signup() {
        const requestBody = {
            dados_pessoais: {
                nome: name,
                sobrenome: surname,
                data_nascimento: birthday
            },
            usuario: {
                email: email,
                senha: password,
                termos_condicoes: acceptTerms,
            }
        }

        try {
            console.log(requestBody);
            setHasRequestedAccount(true);
            setRequestHasError(false);
            const response = await fetch('https://equiztech.rafaelbriet.com.br/api/registro/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            
            if (data.erro) {
                setRequestHasError(true);
                setRequestError(data.erro);
                console.log(data.erro);
            } else {
                await login();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setHasRequestedAccount(false);
        }
    }

    async function login() {
        const requestBody = {
            usuario: {
                email: email,
                senha: password
            }
        }

        try {
            const response = await fetch('https://equiztech.rafaelbriet.com.br/api/autenticacao/login.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            
            if (data.erro) {
                setRequestHasError(true);
            } else {
                setToken(data);
                router.replace('/home')
            }
        } catch (error) {
            console.error(error);
        }
    }

    function formatBirthDay(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        setBirthday(`${year}-${month}-${day}`);
        setDisplayBirthday(`${day}/${month}/${year}`);
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            {hasRequestedAccount ? (<ActivityIndicator animating={true} />) : null}

            {!hasRequestedAccount ? (
                <View>
                    <TextInput
                        label="Nome"
                        value={name}
                        onChangeText={name => setName(name)}
                        style={{
                            marginBottom: 16
                        }}
                    />

                    <TextInput
                        label="Sobrenome"
                        value={surname}
                        onChangeText={surname => setSurname(surname)}
                        style={{
                            marginBottom: 16
                        }}
                    />

                    <TextInput
                        label="Data de Nascimento"
                        value={displayBirthday}
                        onPressIn={() => {setDatePickerVisibility(true); console.log('hello')}}
                        showSoftInputOnFocus={false}
                        style={{
                            marginBottom: 16
                        }}
                    />

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => {setDatePickerVisibility(false); formatBirthDay(date)}}
                        onCancel={() => setDatePickerVisibility(false)}
                    />

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        inputMode='email'
                        style={{
                            marginBottom: 16
                        }}
                    />

                    <TextInput
                        label="Senha"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        secureTextEntry={true}
                        style={{
                            marginBottom: 16
                        }}
                    />

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 16
                        }}
                    >
                        <Checkbox
                            status={acceptTerms ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setAcceptTerms(!acceptTerms);
                            }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                flexWrap: 'wrap'
                            }}
                        >
                            Aceito os <Link href={'/(legal)/terms-of-service'} style={{color: 'blue'}}>Termos de Serviço</Link> e <Link href={'/(legal)/privacy-policy'} style={{color: 'blue'}}>Política de Privacidade</Link>.
                        </Text>
                    </View>

                    <Button
                        mode='contained'
                        onPress={signup}
                        style={{
                            marginBottom: 16
                        }}
                    >
                        Criar conta
                    </Button>
                </View>
            ) : null}
            <Snackbar
                visible={requestHasErrors}
                onDismiss={() => setRequestHasError(false)}
                action={{
                    label: 'Ok',
                }}
            >
                {requestError.mensagem}
            </Snackbar>
        </View>
    );
}