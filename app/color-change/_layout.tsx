import { Stack } from "expo-router";

export default function ColorChangeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="color" />
        </Stack>
    );
}
