import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { PillButton } from "@/components/ui/PillButton";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

const { width } = Dimensions.get("window");

const colors = [
    { id: "white", name: "Beyaz", hex: "#FFFFFF" },
    { id: "cream", name: "Krem", hex: "#FFFDD0" },
    { id: "beige", name: "Bej", hex: "#F5F5DC" },
    { id: "gray", name: "Gri", hex: "#808080" },
    { id: "charcoal", name: "Antrasit", hex: "#36454F" },
    { id: "navy", name: "Lacivert", hex: "#000080" },
    { id: "blue", name: "Mavi", hex: "#4169E1" },
    { id: "teal", name: "Petrol", hex: "#008080" },
    { id: "green", name: "Yeşil", hex: "#228B22" },
    { id: "olive", name: "Zeytin", hex: "#808000" },
    { id: "terracotta", name: "Terrakota", hex: "#E2725B" },
    { id: "orange", name: "Turuncu", hex: "#FF8C00" },
    { id: "coral", name: "Mercan", hex: "#FF7F50" },
    { id: "pink", name: "Pembe", hex: "#FFB6C1" },
    { id: "purple", name: "Mor", hex: "#800080" },
    { id: "burgundy", name: "Bordo", hex: "#800020" },
];

export default function ColorSelectScreen() {
    const router = useRouter();
    const { originalImage, selectedColor, setSelectedColor, credits } = useRoom();
    const [selected, setSelected] = useState(selectedColor);

    const handleColorSelect = (hex: string) => {
        setSelected(hex);
        setSelectedColor(hex);
    };

    const handleGenerate = () => {
        if (!originalImage || !selected) return;
        router.push({
            pathname: "/loading",
            params: { action: "recolor" },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-card rounded-full items-center justify-center shadow-sm"
                >
                    <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">Renk Seç</Text>
                <CreditBadge credits={credits} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                {/* Preview Image */}
                {originalImage && (
                    <View className="mb-6">
                        <Image
                            source={{ uri: originalImage }}
                            className="w-full h-48 rounded-3xl"
                            resizeMode="cover"
                        />
                    </View>
                )}

                {/* Color Grid */}
                <Text className="text-base font-semibold text-foreground mb-4">
                    Renk Seçin
                </Text>
                <View className="flex-row flex-wrap gap-3">
                    {colors.map((color, index) => (
                        <MotiView
                            key={color.id}
                            from={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "timing", duration: 200, delay: index * 20 }}
                        >
                            <TouchableOpacity
                                onPress={() => handleColorSelect(color.hex)}
                                className="items-center"
                                style={{ width: (width - 48) / 4 - 8 }}
                            >
                                <View
                                    className={`w-14 h-14 rounded-2xl mb-1 ${selected === color.hex ? "border-4 border-primary" : "border border-border"
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                />
                                <Text className="text-xs text-muted-foreground text-center">
                                    {color.name}
                                </Text>
                            </TouchableOpacity>
                        </MotiView>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Action */}
            <View className="absolute bottom-0 left-0 right-0 bg-background px-4 pb-8 pt-4">
                <PillButton
                    onPress={handleGenerate}
                    disabled={!selected}
                    fullWidth
                    size="lg"
                    icon={<Ionicons name="color-palette" size={20} color="#FFFFFF" />}
                >
                    Uygula (8 Kredi)
                </PillButton>
            </View>
        </SafeAreaView>
    );
}
