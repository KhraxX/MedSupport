import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/context/ctx';
import Ionicons from "@expo/vector-icons/Ionicons"; // Correction ici

export default function TabLayout() {
    const { user } = useAuth();

    if (!user) return <Redirect href="/login" />;
  
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#ffd33d",
                headerStyle: {
                    backgroundColor: "#25292e",
                },
                headerShadowVisible: false,
                headerTintColor: "#fff",
                tabBarStyle: {
                    backgroundColor: "#25292e",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "information-circle" : "information-circle-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="tickets"
                options={{
                    title: "Tickets",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? "ticket" : "ticket-outline"} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }}
            />
        </Tabs>
    );
}