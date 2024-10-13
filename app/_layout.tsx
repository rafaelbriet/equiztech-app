import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import AppContextProvider from '@/components/AppContextProvider';

export default function RootLayout() {
  return (
      <AppContextProvider>
          <PaperProvider>
              <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="sign-in" options={{ title: 'Entrar', presentation: 'modal' }} />
              </Stack>
          </PaperProvider>
      </AppContextProvider>
  );
}
