import { Stack } from "expo-router";

export default function StyleChangeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="style" />
        </Stack>
    );
}
