import { LogBox, Text, View } from "react-native";
import React, {useState, useContext} from 'react';
import { ActivityIndicator, Button, HelperText, Snackbar, TextInput } from 'react-native-paper';
import { Link, router } from "expo-router";
import AppContext from "@/components/AppContext";
import Styles from "@/constants/Stylesheet";

export default function Step2() {
    return (
        <View
            style={[
                Styles.container,
            ]}
        >
            <Text
            style={{
                marginBottom: 8
            }}
            >
                Enviamos um link de verificação para o seu e-mail.
            </Text>

            <Text
                style={{
                    marginBottom: 16
                }}
            >
                Assim que recebê-lo, clique nele para continuar o processo de redefinição de senha.
            </Text>

            <Button
                mode='contained'
                onPress={() => {router.replace('/sign-in')}}
                style={{
                    marginBottom: 16
                }}
            >
                Voltar para o Login
            </Button>
        </View>
    );
}
