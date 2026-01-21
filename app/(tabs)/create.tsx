import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { SoftCard } from "@/components/ui/SoftCard";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

const features = [
    {
        id: "style",
        title: "Stil Değişikliği",
        description: "Odanızın stilini tamamen değiştirin",
        icon: "brush-outline" as const,
        credits: 8,
        route: "/style-change",
    },
    {
        id: "erase",
        title: "Obje Silme",
        description: "İstenmeyen nesneleri kaldırın",
        icon: "trash-outline" as const,
        credits: 4,
        route: "/object-remove",
    },
    {
        id: "color",
        title: "Renk Değişikliği",
        description: "Duvar ve mobilya renklerini değiştirin",
        icon: "color-palette-outline" as const,
        credits: 8,
        route: "/color-change",
    },
    {
        id: "garden",
        title: "Bahçe Tasarımı",
        description: "Bahçenizi yeniden tasarlayın",
        icon: "leaf-outline" as const,
        credits: 8,
        route: "/garden-redesign",
    },
    {
        id: "exterior",
        title: "Dış Cephe",
        description: "Evinizin dış görünümünü yenileyin",
        icon: "home-outline" as const,
        credits: 8,
        route: "/exterior-redesign",
    },
    {
        id: "furniture",
        title: "Mobilya Değiştir",
        description: "Mobilya stillerini değiştirin",
        icon: "bed-outline" as const,
        credits: 8,
        route: "/furniture-replace",
    },
    {
        id: "fill",
        title: "Boşluk Doldur",
        description: "Eksik parçaları alana ekleyin",
        icon: "add-circle-outline" as const,
        credits: 8,
        route: "/fill-spaces",
    },
    {
        id: "wall",
        title: "Duvar Yenile",
        description: "Duvarları yeniden tasarlayın",
        icon: "layers-outline" as const,
        credits: 8,
        route: "/wall-refresh",
    },
    {
        id: "floor",
        title: "Zemin Değiştir",
        description: "Zeminlerinize yeni materyal uygulayın",
        icon: "grid-outline" as const,
        credits: 8,
        route: "/floor-replace",
    },
];

export default function CreateScreen() {
    const router = useRouter();
    const { credits } = useRoom();

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-24"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-4 pt-4 pb-2">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-2xl font-bold text-foreground">Oluştur</Text>
                        <CreditBadge credits={credits} />
                    </View>
                    <Text className="text-muted-foreground">
                        Ne yapmak istersiniz?
                    </Text>
                </View>

                {/* Feature Cards */}
                <View className="px-4 pt-4 gap-4">
                    {features.map((feature, index) => (
                        <MotiView
                            key={feature.id}
                            from={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: "timing", duration: 400, delay: index * 60 }}
                        >
                            <TouchableOpacity
                                onPress={() => router.push(feature.route as any)}
                                activeOpacity={0.8}
                            >
                                <SoftCard variant="elevated" padding="none" className="overflow-hidden">
                                    <View className="flex-row">
                                        {/* Icon Section */}
                                        <View className="w-28 h-28 bg-primary/10 items-center justify-center">
                                            <Ionicons name={feature.icon} size={40} color="#E86A12" />
                                        </View>

                                        {/* Content Section */}
                                        <View className="flex-1 p-3 justify-between">
                                            <View>
                                                <View className="flex-row items-center gap-2 mb-1">
                                                    <Text className="font-semibold text-foreground">
                                                        {feature.title}
                                                    </Text>
                                                </View>
                                                <Text className="text-xs text-muted-foreground">
                                                    {feature.description}
                                                </Text>
                                            </View>

                                            <View className="flex-row items-center justify-between mt-2">
                                                <Text className="text-xs text-primary font-medium">
                                                    {feature.credits} kredi
                                                </Text>
                                                <View className="w-7 h-7 bg-primary rounded-full items-center justify-center">
                                                    <Ionicons
                                                        name="arrow-forward"
                                                        size={14}
                                                        color="#FFFFFF"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </SoftCard>
                            </TouchableOpacity>
                        </MotiView>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
