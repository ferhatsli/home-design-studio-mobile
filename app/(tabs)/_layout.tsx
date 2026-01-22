import { Tabs } from "expo-router";
import { View } from "react-native";
import { CustomBottomNav } from "@/components/CustomBottomNav";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // Hide default tab bar
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="inspiration"
          options={{
            title: "İlham",
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Geçmiş",
          }}
        />
        {/* Hide these screens from tab navigation but keep them accessible */}
        <Tabs.Screen
          name="create"
          options={{
            href: null, // Exclude from tab bar
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null, // Exclude from tab bar
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            href: null, // Exclude from tab bar
          }}
        />
      </Tabs>
      <CustomBottomNav />
    </View>
  );
}
