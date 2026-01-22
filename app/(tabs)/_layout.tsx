import { Tabs, usePathname, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface NavItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const navItems: NavItem[] = [
  { name: "index", icon: "home-outline", activeIcon: "home", label: "Home" },
  { name: "inspiration", icon: "bulb-outline", activeIcon: "bulb", label: "İlham" },
  { name: "history", icon: "time-outline", activeIcon: "time", label: "Geçmiş" },
];

function CustomTabBar({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePress = (name: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (name === "index") {
      router.push("/(tabs)");
    } else {
      router.push(`/(tabs)/${name}` as any);
    }
  };

  return (
    <MotiView
      from={{ translateY: 100 }}
      animate={{ translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={{
        position: "absolute",
        bottom: Math.max(insets.bottom, 16),
        left: 16,
        right: 16,
        zIndex: 50,
      }}
    >
      <View
        style={{
          backgroundColor: "#E86A12",
          borderRadius: 9999,
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 400,
          alignSelf: "center",
          width: "100%",
          shadowColor: "#E86A12",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        {navItems.map((item) => {
          const active = activeTab === item.name;

          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => handlePress(item.name)}
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 9999,
                backgroundColor: active ? "#2D2D2D" : "transparent",
              }}
            >
              <Ionicons
                name={active ? item.activeIcon : item.icon}
                size={20}
                color={active ? "#FFFFFF" : "rgba(255,255,255,0.8)"}
              />
              {active && (
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </MotiView>
  );
}

export default function TabsLayout() {
  const pathname = usePathname();

  // Determine active tab from pathname
  const getActiveTab = () => {
    if (pathname === "/" || pathname === "/index" || pathname === "") {
      return "index";
    }
    if (pathname.includes("inspiration")) return "inspiration";
    if (pathname.includes("history")) return "history";
    return "index";
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: "Home" }}
        />
        <Tabs.Screen
          name="inspiration"
          options={{ title: "İlham" }}
        />
        <Tabs.Screen
          name="history"
          options={{ title: "Geçmiş" }}
        />
        <Tabs.Screen
          name="create"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="profile"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="two"
          options={{ href: null }}
        />
      </Tabs>
      <CustomTabBar activeTab={getActiveTab()} />
    </View>
  );
}
