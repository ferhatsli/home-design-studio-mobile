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
import Animated, { FadeIn } from "react-native-reanimated";
import { PillButton } from "@/components/ui/PillButton";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const designStyles = [
    { id: "modern", name: "Modern", emoji: "🏢" },
    { id: "scandinavian", name: "İskandinav", emoji: "🌲" },
    { id: "minimalist", name: "Minimalist", emoji: "⬜" },
    { id: "industrial", name: "Endüstriyel", emoji: "🏭" },
    { id: "bohemian", name: "Bohem", emoji: "🌺" },
    { id: "traditional", name: "Klasik", emoji: "🏛️" },
    { id: "farmhouse", name: "Çiftlik Evi", emoji: "🏡" },
    { id: "coastal", name: "Sahil", emoji: "🏖️" },
    { id: "mid-century", name: "Mid-Century", emoji: "🪑" },
    { id: "art-deco", name: "Art Deco", emoji: "✨" },
    { id: "rustic", name: "Rustik", emoji: "🪵" },
    { id: "contemporary", name: "Çağdaş", emoji: "🎨" },
];

export default function StyleSelectScreen() {
    const router = useRouter();
    const {
        originalImage,
        designStyle,
        setDesignStyle,
        credits,
    } = useRoom();
    const [selectedStyle, setSelectedStyle] = useState(designStyle);

    const handleStyleSelect = (styleName: string) => {
        setSelectedStyle(styleName);
        setDesignStyle(styleName);
    };

    const handleGenerate = () => {
        if (!originalImage || !selectedStyle) return;
        router.push({
            pathname: "/loading",
            params: { action: "redesign" },
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
                <Text className="text-lg font-semibold text-foreground">Stil Seç</Text>
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

                {/* Style Grid */}
                <Text className="text-base font-semibold text-foreground mb-4">
                    Tarz Seçin
                </Text>
                <View className="flex-row flex-wrap justify-between">
                    {designStyles.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeIn.delay(index * 30).duration(300)}
                            style={{ width: CARD_WIDTH, marginBottom: 16 }}
                        >
                            <TouchableOpacity
                                onPress={() => handleStyleSelect(item.name)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={{
                                        height: 96,
                                        borderRadius: 16,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: selectedStyle === item.name ? "#E86A12" : "#FFFFFF",
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 2,
                                        elevation: 2,
                                    }}
                                >
                                    <Text style={{ fontSize: 30, marginBottom: 4 }}>{item.emoji}</Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 14,
                                            color: selectedStyle === item.name ? "#FFFFFF" : "#1A1A1A",
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Action */}
            <View className="absolute bottom-0 left-0 right-0 bg-background px-4 pb-8 pt-4">
                <PillButton
                    onPress={handleGenerate}
                    disabled={!selectedStyle}
                    fullWidth
                    size="lg"
                    icon={<Ionicons name="sparkles" size={20} color="#FFFFFF" />}
                >
                    Oluştur (8 Kredi)
                </PillButton>
            </View>
        </SafeAreaView>
    );
}
