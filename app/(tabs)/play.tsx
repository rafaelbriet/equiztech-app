import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Play() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text>Selecione uma categoria</Text>
        </View>
    );
}