import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { PillButton } from "@/components/ui/PillButton";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const designStyles = [
    { id: "modern", name: "Modern", emoji: "🏢" },
    { id: "cozy", name: "Sıcak", emoji: "🛋️" },
    { id: "minimalist", name: "Minimalist", emoji: "⬜" },
    { id: "maximalist", name: "Maximalist", emoji: "🎨" },
    { id: "plants", name: "Bitkili", emoji: "🌿" },
    { id: "artsy", name: "Sanatsal", emoji: "🖼️" },
];

export default function FillSpacesStyleScreen() {
    const router = useRouter();
    const { originalImage, designStyle, setDesignStyle, credits } = useRoom();
    const [selectedStyle, setSelectedStyle] = useState(designStyle);

    const handleStyleSelect = (style: string) => {
        setSelectedStyle(style);
        setDesignStyle(style);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-card rounded-full items-center justify-center shadow-sm">
                    <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">Dolgu Stili</Text>
                <CreditBadge credits={credits} />
            </View>

            <ScrollView className="flex-1" contentContainerClassName="px-4 pb-32" showsVerticalScrollIndicator={false}>
                {originalImage && <View className="mb-6"><Image source={{ uri: originalImage }} className="w-full h-48 rounded-3xl" resizeMode="cover" /></View>}
                <Text className="text-base font-semibold text-foreground mb-4">Dolgu Stili Seçin</Text>
                <View className="flex-row flex-wrap justify-between">
                    {designStyles.map((style, index) => (
                        <MotiView key={style.id} from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "timing", duration: 300, delay: index * 30 }}>
                            <TouchableOpacity onPress={() => handleStyleSelect(style.name)} className="mb-4" style={{ width: CARD_WIDTH }}>
                                <View className={`h-24 rounded-2xl items-center justify-center ${selectedStyle === style.name ? "bg-primary" : "bg-card shadow-sm"}`}>
                                    <Text className="text-3xl mb-1">{style.emoji}</Text>
                                    <Text className={`font-medium text-sm ${selectedStyle === style.name ? "text-white" : "text-foreground"}`}>{style.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </MotiView>
                    ))}
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 bg-background px-4 pb-8 pt-4">
                <PillButton onPress={() => router.push({ pathname: "/loading", params: { action: "fill" } })} disabled={!selectedStyle} fullWidth size="lg" icon={<Ionicons name="sparkles" size={20} color="#FFFFFF" />}>
                    Oluştur (8 Kredi)
                </PillButton>
            </View>
        </SafeAreaView>
    );
}
