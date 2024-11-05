import UserProfileContextProvider from "@/components/UserProfileContextProvider";
import { Stack } from "expo-router";

export default function GameLayout() {
    return (
        <UserProfileContextProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </UserProfileContextProvider>
    );
}
