import { LogBox, Text, View } from "react-native";
import React, {useState, useContext} from 'react';
import { ActivityIndicator, Button, HelperText, Snackbar, TextInput } from 'react-native-paper';
import { Link, router } from "expo-router";
import AppContext from "@/components/AppContext";
import Styles from "@/constants/Stylesheet";

export default function Step1() {
    const [email, setEmail] = useState("");
    const [hasRequestedPasswordReset, setHasRequestedPasswordReset] = useState(false);
    const [requestHasErrors, setRequestHasError] = useState(false);
    const [requestError, setRequestError] = useState({} as any);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);

    async function requestPasswordReset() {

        if (!email) {
            setIsEmailEmpty(true);
            return
        } else {
            setIsEmailEmpty(false);
        }

        const requestBody = {
            usuario: {
                email: email,
            }
        }

        try {
            setHasRequestedPasswordReset(true);
            setRequestHasError(false);
            const response = await fetch('https://equiztech.rafaelbriet.com.br/api/autenticacao/esqueci-minha-senha.php/', {
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
            } else {
                router.replace('/(password-reset)/step-2')
            }
        } catch (error) {
            console.error(error);
        } finally {
            setHasRequestedPasswordReset(false);
        }
    }

    return (
        <View
            style={[
                Styles.container,
            ]}
        >
            {hasRequestedPasswordReset ? (
                <ActivityIndicator animating={true} />
            ) : (
                <View>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />
                    <HelperText 
                        type="error" 
                        visible={isEmailEmpty}
                        padding='none'
                    >
                        É necessário informar um e-mail.
                    </HelperText>
                    <Button
                        mode='contained'
                        onPress={requestPasswordReset}
                        style={{
                            marginBottom: 16
                        }}
                    >
                        Continuar
                    </Button>
                </View>
            )}

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
