import { Stack } from "expo-router";

export default function LegalLayout() {
  return (
        <Stack>
            <Stack.Screen name="terms-of-service" options={{ title: 'Termos de Serviço', presentation: 'modal' }} />
            <Stack.Screen name="privacy-policy" options={{ title: 'Política de Privacidade', presentation: 'modal' }} />
        </Stack>
  );
}
