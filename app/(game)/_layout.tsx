import { Stack } from "expo-router";

export default function GameLayout() {
  return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }} />
        </Stack>
  );
}
