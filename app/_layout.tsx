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
                  <Stack.Screen name="sign-up" options={{ title: 'Crie uma conta', presentation: 'modal' }} />
                  <Stack.Screen name="(legal)" options={{ headerShown: false }}/>
                  <Stack.Screen name="(password-reset)" options={{ headerShown: false }}/>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                  <Stack.Screen name="(game)" options={{ headerShown: false }}/>
              </Stack>
          </PaperProvider>
      </AppContextProvider>
  );
}
