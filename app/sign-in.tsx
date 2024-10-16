import { Text, View } from "react-native";
import React, {useState, useContext} from 'react';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { Link, router } from "expo-router";
import AppContext from "@/components/AppContext";


export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasRequestedLogin, setHasRequestedLogin] = useState(false);
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const {token, setToken} = useContext(AppContext);

    async function login() {
        const requestBody = {
            usuario: {
                email: email,
                senha: password
            }
        }

        try {
            setHasRequestedLogin(true);
            setHasLoginFailed(false);
            const response = await fetch('https://equiztech.rafaelbriet.com.br/api/autenticacao/login.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            
            if (data.erro) {
                setHasLoginFailed(true);
            } else {
                setToken(data);
                router.replace('/(game)')
            }
        } catch (error) {
            console.error(error);
        } finally {
            setHasRequestedLogin(false);
        }
    }

    if (hasRequestedLogin) {
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
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 16
                }}
            >
                <View>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
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
    
                    {hasLoginFailed ? (
                        <Text
                            style={{
                                backgroundColor: '#f8d7da',
                                color: '#dc3545',
                                borderWidth: 1,
                                borderColor: '#f1aeb5',
                                borderRadius: 8,
                                padding: 8,
                                marginBottom: 16
                            }}
                        >
                            E-mail e/ou senha incorretos. Por favor, tente novamente.
                        </Text>
                    ) : null }
    
                    <Button
                        mode='contained'
                        onPress={login}
                        style={{
                            marginBottom: 16
                        }}
                    >
                        Fazer Login
                    </Button>
    
                    <Link href='/(password-reset)/step-1' asChild>
                        <Button mode='text'>Esqueci minha senha</Button>
                    </Link>
                </View>
            </View>
        );
    }
}