import { Stack } from "expo-router";
import UserProfileContextProvider from "@/components/UserProfileContextProvider";

export default function GameLayout() {
  return (
        <UserProfileContextProvider>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }} />
            <Stack.Screen name="profile" options={{ title: 'Meu Perfil', headerShown: true }} />
          </Stack>
        </UserProfileContextProvider>
  );
}
