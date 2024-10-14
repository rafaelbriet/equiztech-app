import { Link } from "expo-router";
import { Image, View } from "react-native";
import { Button } from 'react-native-paper';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Image
        source={require('@/assets/images/logo-equiztech.png')}
        style={{
          marginBottom: 16,
          width: 200, height: 75,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />

      <Link href='/sign-in' asChild style={{ marginBottom: 16 }}>
        <Button mode='contained'>Fazer Login</Button>
      </Link>

      <Link href='/sign-up' asChild>
        <Button mode='outlined'>Criar conta</Button>
      </Link>
    </View>
  );
}
