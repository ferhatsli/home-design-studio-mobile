import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, LayoutAnimation, Platform, UIManager } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

interface NavItem {
    path: string;
    icon: keyof typeof Ionicons.glyphMap;
    activeIcon: keyof typeof Ionicons.glyphMap;
    label: string;
}

const navItems: NavItem[] = [
    { path: "/(tabs)", icon: "home-outline", activeIcon: "home", label: "Home" },
    { path: "/(tabs)/inspiration", icon: "bulb-outline", activeIcon: "bulb", label: "İlham" },
    { path: "/(tabs)/history", icon: "time-outline", activeIcon: "time", label: "Geçmiş" },
];

export const CustomBottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    // Check active state - handle both index and explicit paths
    const isActive = (path: string) => {
        if (path === "/(tabs)") {
            return pathname === "/" || pathname === "/index" || pathname === "";
        }
        return pathname.includes(path.replace("/(tabs)", ""));
    };

    // Trigger smooth layout animation when pathname changes
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [pathname]);

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
                    const active = isActive(item.path);

                    return (
                        <TouchableOpacity
                            key={item.path}
                            onPress={() => router.push(item.path as any)}
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
};
