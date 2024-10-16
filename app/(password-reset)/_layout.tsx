import { Stack } from "expo-router";

export default function LegalLayout() {
  return (
        <Stack>
            <Stack.Screen name="step-1" options={{ title: 'Etapa 1 - Redefinição de Senha', presentation: 'modal' }} />
            <Stack.Screen name="step-2" options={{ title: 'Etapa 2 - Redefinição de Senha', presentation: 'modal' }} />
        </Stack>
  );
}
