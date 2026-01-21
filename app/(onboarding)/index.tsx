import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { PillButton } from "@/components/ui/PillButton";

const { width } = Dimensions.get("window");

const slides = [
    {
        icon: "sparkles" as const,
        title: "Stil Değiştir",
        description:
            "Odanızı Modern, İskandinav, Klasik ve daha birçok tarzda yeniden tasarlayın",
        color: "#E86A12",
    },
    {
        icon: "trash-outline" as const,
        title: "Nesne Sil",
        description: "İstemediğiniz nesneleri tek dokunuşla fotoğraftan kaldırın",
        color: "#F59E0B",
    },
    {
        icon: "color-palette-outline" as const,
        title: "Renk Değiştir",
        description:
            "Duvarları, mobilyaları ve daha fazlasının rengini anında değiştirin",
        color: "#10B981",
    },
];

export default function OnboardingScreen() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            router.replace("/(tabs)");
        }
    };

    const skip = () => {
        router.replace("/(tabs)");
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Content */}
            <View className="flex-1 items-center justify-center px-6">
                <MotiView
                    key={currentSlide}
                    from={{ opacity: 0, translateX: 50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: "timing", duration: 400 }}
                    className="items-center"
                >
                    {/* Icon Container */}
                    <MotiView
                        from={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "timing",
                            duration: 600,
                            loop: true,
                            repeatReverse: true,
                        }}
                        className="w-24 h-24 bg-card rounded-3xl items-center justify-center mb-8 shadow-lg"
                    >
                        <Ionicons
                            name={slides[currentSlide].icon}
                            size={48}
                            color={slides[currentSlide].color}
                        />
                    </MotiView>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-foreground mb-3 text-center">
                        {slides[currentSlide].title}
                    </Text>

                    {/* Description */}
                    <Text className="text-muted-foreground text-base text-center leading-relaxed px-4">
                        {slides[currentSlide].description}
                    </Text>
                </MotiView>
            </View>

            {/* Bottom Section */}
            <View className="px-6 pb-8">
                {/* Pagination Dots */}
                <View className="flex-row justify-center gap-2 mb-8">
                    {slides.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setCurrentSlide(index)}
                        >
                            <View
                                className={`h-2 rounded-full ${index === currentSlide
                                        ? "w-8 bg-primary"
                                        : "w-2 bg-muted-foreground/30"
                                    }`}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Action Button */}
                <PillButton
                    onPress={nextSlide}
                    size="lg"
                    fullWidth
                    icon={<Ionicons name="chevron-forward" size={20} color="#FFFFFF" />}
                >
                    {currentSlide === slides.length - 1 ? "Başla" : "Devam"}
                </PillButton>

                {/* Skip Link */}
                {currentSlide < slides.length - 1 && (
                    <TouchableOpacity onPress={skip} className="mt-4 py-2">
                        <Text className="text-muted-foreground text-center font-medium">
                            Tanıtımı Atla
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}
