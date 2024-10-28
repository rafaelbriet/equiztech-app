import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Quiz() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16
            }}
        >
            <Text variant="headlineLarge">Começar quiz</Text>
        </View>
    );
}