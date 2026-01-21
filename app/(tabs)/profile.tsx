import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SoftCard } from "@/components/ui/SoftCard";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

export default function ProfileScreen() {
    const router = useRouter();
    const { credits } = useRoom();

    const menuItems = [
        {
            icon: "flash-outline" as const,
            title: "Kredi Satın Al",
            subtitle: "Daha fazla dönüşüm yapın",
            onPress: () => router.push("/paywall"),
        },
        {
            icon: "star-outline" as const,
            title: "Premium'a Geç",
            subtitle: "Sınırsız erişim kazanın",
            onPress: () => router.push("/paywall"),
        },
        {
            icon: "help-circle-outline" as const,
            title: "Yardım & Destek",
            subtitle: "Sorularınızı yanıtlayalım",
            onPress: () => { },
        },
        {
            icon: "document-text-outline" as const,
            title: "Gizlilik Politikası",
            subtitle: "Verilerinizi nasıl kullanıyoruz",
            onPress: () => { },
        },
        {
            icon: "information-circle-outline" as const,
            title: "Hakkında",
            subtitle: "Uygulama hakkında",
            onPress: () => { },
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-24"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-4 pt-4 pb-6">
                    <Text className="text-2xl font-bold text-foreground">Profil</Text>
                </View>

                {/* Credits Card */}
                <View className="px-4 mb-6">
                    <SoftCard variant="elevated" className="bg-primary">
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text className="text-white/80 text-sm">Mevcut Krediniz</Text>
                                <Text className="text-white text-3xl font-bold mt-1">
                                    {credits}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => router.push("/paywall")}
                                className="bg-white rounded-full px-4 py-2"
                            >
                                <Text className="text-primary font-semibold">Satın Al</Text>
                            </TouchableOpacity>
                        </View>
                    </SoftCard>
                </View>

                {/* Menu Items */}
                <View className="px-4 gap-3">
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} onPress={item.onPress}>
                            <SoftCard variant="elevated" padding="none">
                                <View className="flex-row items-center p-4">
                                    <View className="w-10 h-10 bg-accent rounded-xl items-center justify-center mr-4">
                                        <Ionicons name={item.icon} size={20} color="#E86A12" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-foreground font-medium">
                                            {item.title}
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            {item.subtitle}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#737373" />
                                </View>
                            </SoftCard>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* App Version */}
                <View className="items-center mt-8">
                    <Text className="text-muted-foreground text-sm">
                        Home Design Studio v1.0.0
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
