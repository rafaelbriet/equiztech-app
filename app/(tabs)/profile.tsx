import { ScrollView, Text, View } from "react-native";
import React, {useState, useContext} from 'react';
import { ActivityIndicator, Button, Checkbox, Snackbar, TextInput } from 'react-native-paper';
import { Link, router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from "@/components/AppContext";
import UserProfileContext from "@/components/UserProfileContext";

export default function Profile() {
    const {token} = useContext(AppContext);
    const {userProfile, setUserProfile} = useContext(UserProfileContext);
    const [name, setName] = useState(userProfile.usuario.nome);
    const [surname, setSurname] = useState(userProfile.usuario.sobrenome);
    const [bio, setBio] = useState(userProfile.usuario.biografia);
    const [birthday, setBirthday] = useState(userProfile.usuario.data_nascimento);
    const [displayBirthday, setDisplayBirthday] = useState(userProfile.usuario.data_nascimento);
    const [email, setEmail] = useState(userProfile.usuario.email);
    const [password, setPassword] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [hasRequestedProfileUpdate, setHasRequestedProfileUpdate] = useState(false);
    const [requestHasErrors, setRequestHasError] = useState(false);
    const [requestError, setRequestError] = useState({} as any);
    const [hasUpdateSucceed, setHasUpdateSucceed] = useState(false);

    async function updateUser() {
        const requestBody = {
            dados_pessoais: {
                nome: name,
                sobrenome: surname,
                data_nascimento: birthday,
                biografia: bio,
                nome_foto: "",
            },
            usuario: {
                email: email,
            }
        }

        try {
            setHasRequestedProfileUpdate(true);
            setRequestHasError(false);
            setHasUpdateSucceed(false);
            const params = new URLSearchParams({
                id_usuario: userProfile.usuario.id
            });
            const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + '/api/perfil/?' + params.toString(), {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + token.token,
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            
            if (data.erro) {
                setRequestHasError(true);
                setRequestError(data.erro);
            } else {
                setHasUpdateSucceed(true);
                setUserProfile(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setHasRequestedProfileUpdate(false);
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
            {hasRequestedProfileUpdate ? (<ActivityIndicator animating={true} />) : null}

            {!hasRequestedProfileUpdate ? (
                <View>
                    <ScrollView>
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
                            label="Biografia"
                            value={bio}
                            onChangeText={bio => setBio(bio)}
                            multiline={true}
                            numberOfLines={5}
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

                        <Button
                            mode='contained'
                            onPress={updateUser}
                            style={{
                                marginBottom: 16
                            }}
                        >
                            Atualizar meu perfil
                        </Button>
                    </ScrollView>
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
            <Snackbar
                visible={hasUpdateSucceed}
                onDismiss={() => setHasUpdateSucceed(false)}
                action={{
                    label: 'Ok',
                }}
            >
                Perfil atualizado com sucesso.
            </Snackbar>
        </View>
    );
}