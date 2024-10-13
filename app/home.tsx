import { Text, View } from "react-native";
import React, { useContext } from 'react';
import AppContext from '@/components/AppContext';

export default function Index() {
    const {token, setToken} = useContext(AppContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text>{JSON.stringify(token)}</Text>
        </View>
    );
}