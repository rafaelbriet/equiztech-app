import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UserProfileContextProvider from "@/components/UserProfileContextProvider";

export default function TabLayout() {
    return (
        <UserProfileContextProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: '#663399' }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Início',
                        headerShown: true,
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Meu Perfil',
                        headerShown: true,
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="user-circle" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="categories"
                    options={{
                        title: 'Jogar',
                        headerShown: true,
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="play-circle" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="quiz"
                    options={{
                        title: 'Jogar',
                        headerShown: true,
                        href: null,
                    }}
                />
            </Tabs>
        </UserProfileContextProvider>
    );
}
