import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import { PillButton } from "@/components/ui/PillButton";
import { useRoom } from "@/context/RoomContext";

const { width } = Dimensions.get("window");

export default function ResultScreen() {
    const router = useRouter();
    const { originalImage, transformedImage, clearFlow, activeFlow } = useRoom();
    const [showBefore, setShowBefore] = useState(false);

    const handleToggle = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowBefore(!showBefore);
    };

    const handleShare = async () => {
        if (!transformedImage) return;

        try {
            await Share.share({
                message: "Home Design Studio ile odamı dönüştürdüm! 🏠✨",
                url: transformedImage,
            });
        } catch (error) {
            console.error("Share error:", error);
        }
    };

    const handleNewDesign = () => {
        clearFlow(activeFlow);
        router.replace("/(tabs)");
    };

    const handleTryAgain = () => {
        router.back();
    };

    if (!transformedImage) {
        return (
            <SafeAreaView className="flex-1 bg-background items-center justify-center">
                <Text className="text-muted-foreground">Sonuç bulunamadı</Text>
                <TouchableOpacity
                    onPress={() => router.replace("/(tabs)")}
                    className="mt-4"
                >
                    <Text className="text-primary font-semibold">Ana Sayfaya Dön</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    onPress={() => router.replace("/(tabs)")}
                    className="w-10 h-10 bg-card rounded-full items-center justify-center shadow-sm"
                >
                    <Ionicons name="close" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">Sonuç</Text>
                <TouchableOpacity
                    onPress={handleShare}
                    className="w-10 h-10 bg-card rounded-full items-center justify-center shadow-sm"
                >
                    <Ionicons name="share-outline" size={20} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            {/* Image Comparison */}
            <View className="flex-1 px-4 pt-4">
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "timing", duration: 500 }}
                    className="flex-1"
                >
                    <View
                        className="flex-1 rounded-3xl overflow-hidden bg-card shadow-lg"
                        style={{ maxHeight: width }}
                    >
                        {/* Before/After Image */}
                        <Image
                            source={{ uri: showBefore ? originalImage! : transformedImage }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />

                        {/* Before/After Label */}
                        <View className="absolute top-4 left-4">
                            <View
                                className={`px-3 py-1.5 rounded-full ${showBefore ? "bg-black/60" : "bg-primary"
                                    }`}
                            >
                                <Text className="text-white font-medium text-sm">
                                    {showBefore ? "Önce" : "Sonra"}
                                </Text>
                            </View>
                        </View>

                        {/* Toggle Button */}
                        <TouchableOpacity
                            onPress={handleToggle}
                            className="absolute bottom-4 right-4 bg-white/90 rounded-full px-4 py-2 flex-row items-center shadow-lg"
                        >
                            <Ionicons
                                name="swap-horizontal"
                                size={18}
                                color="#1A1A1A"
                            />
                            <Text className="text-foreground font-medium ml-2">
                                {showBefore ? "Sonra" : "Önce"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MotiView>

                {/* Success Message */}
                <View className="items-center mt-6">
                    <View className="flex-row items-center bg-green-100 px-4 py-2 rounded-full">
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        <Text className="text-green-700 font-medium ml-2">
                            Dönüşüm başarıyla tamamlandı!
                        </Text>
                    </View>
                </View>
            </View>

            {/* Actions */}
            <View className="px-4 pb-8 pt-4 gap-3">
                <PillButton
                    onPress={handleNewDesign}
                    fullWidth
                    size="lg"
                    icon={<Ionicons name="add" size={20} color="#FFFFFF" />}
                >
                    Yeni Tasarım
                </PillButton>
                <TouchableOpacity
                    onPress={handleTryAgain}
                    className="py-3"
                >
                    <Text className="text-center text-muted-foreground font-medium">
                        Tekrar Dene
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
