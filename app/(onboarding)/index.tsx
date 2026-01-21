import React, { useState, useEffect } from "react";
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
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { PillButton } from "@/components/ui/PillButton";

import {
    styleBefore,
    styleAfter,
    objectBefore,
    objectAfter,
    colorBefore,
    colorAfter,
} from "@/assets";

const { width } = Dimensions.get("window");

const slides = [
    {
        icon: "sparkles" as const,
        title: "Stil Değiştir",
        description:
            "Odanızı Modern, İskandinav, Klasik ve daha birçok tarzda yeniden tasarlayın",
        color: "#E86A12",
        beforeImage: styleBefore,
        afterImage: styleAfter,
        type: "slider",
    },
    {
        icon: "trash-outline" as const,
        title: "Nesne Sil",
        description: "İstemediğiniz nesneleri tek dokunuşla fotoğraftan kaldırın",
        color: "#F59E0B",
        beforeImage: objectBefore,
        afterImage: objectAfter,
        type: "fade",
    },
    {
        icon: "color-palette-outline" as const,
        title: "Renk Değiştir",
        description:
            "Duvarları, mobilyaları ve daha fazlasının rengini anında değiştirin",
        color: "#10B981",
        beforeImage: colorBefore,
        afterImage: colorAfter,
        type: "slider",
    },
];

// Animated slider comparison component
const SliderComparison = ({
    beforeImage,
    afterImage,
}: {
    beforeImage: any;
    afterImage: any;
}) => {
    const sliderPosition = useSharedValue(50);

    useEffect(() => {
        sliderPosition.value = withRepeat(
            withTiming(75, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const clipStyle = useAnimatedStyle(() => ({
        width: `${100 - sliderPosition.value}%`,
    }));

    const sliderLineStyle = useAnimatedStyle(() => ({
        left: `${sliderPosition.value}%`,
    }));

    return (
        <View className="relative w-full h-48 rounded-3xl overflow-hidden">
            {/* After Image (background) */}
            <Image
                source={afterImage}
                className="absolute w-full h-full"
                resizeMode="cover"
            />

            {/* Before Image (clipped) */}
            <Animated.View
                className="absolute top-0 left-0 bottom-0 overflow-hidden"
                style={clipStyle}
            >
                <Image
                    source={beforeImage}
                    style={{ width: width - 48, height: 192 }}
                    resizeMode="cover"
                />
            </Animated.View>

            {/* Labels */}
            <View className="absolute top-3 left-3 bg-black/50 px-2 py-1 rounded-full">
                <Text className="text-white text-xs">Önce</Text>
            </View>
            <View className="absolute top-3 right-3 bg-primary px-2 py-1 rounded-full">
                <Text className="text-white text-xs">Sonra</Text>
            </View>

            {/* Slider Line */}
            <Animated.View
                className="absolute top-0 bottom-0 w-0.5 bg-white items-center justify-center"
                style={[sliderLineStyle, { transform: [{ translateX: -1 }] }]}
            >
                <View className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-lg">
                    <View className="flex-row gap-0.5">
                        <View className="w-0.5 h-3 bg-gray-400 rounded-full" />
                        <View className="w-0.5 h-3 bg-gray-400 rounded-full" />
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

// Fade animation comparison
const FadeComparison = ({
    beforeImage,
    afterImage,
}: {
    beforeImage: any;
    afterImage: any;
}) => {
    const [showAfter, setShowAfter] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowAfter((prev) => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="relative w-full h-48 rounded-3xl overflow-hidden">
            <MotiView
                animate={{ opacity: showAfter ? 0 : 1 }}
                transition={{ type: "timing", duration: 500 }}
                className="absolute w-full h-full"
            >
                <Image
                    source={beforeImage}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </MotiView>
            <MotiView
                animate={{ opacity: showAfter ? 1 : 0 }}
                transition={{ type: "timing", duration: 500 }}
                className="absolute w-full h-full"
            >
                <Image
                    source={afterImage}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </MotiView>

            {/* Label */}
            <MotiView
                className="absolute bottom-3 left-1/2 px-3 py-1.5 rounded-full"
                animate={{
                    backgroundColor: showAfter ? "#E86A12" : "rgba(0,0,0,0.6)",
                }}
                style={{ transform: [{ translateX: -40 }] }}
            >
                <Text className="text-white text-xs font-medium">
                    {showAfter ? "Tamamlandı! ✨" : "Siliniyor..."}
                </Text>
            </MotiView>
        </View>
    );
};

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

    const renderComparison = () => {
        const slide = slides[currentSlide];
        if (slide.type === "fade") {
            return (
                <FadeComparison
                    beforeImage={slide.beforeImage}
                    afterImage={slide.afterImage}
                />
            );
        }
        return (
            <SliderComparison
                beforeImage={slide.beforeImage}
                afterImage={slide.afterImage}
            />
        );
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
                    className="items-center w-full"
                >
                    {/* Before/After Image Comparison */}
                    {renderComparison()}

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
                        className="w-20 h-20 bg-card rounded-3xl items-center justify-center mt-6 mb-4 shadow-lg"
                    >
                        <Ionicons
                            name={slides[currentSlide].icon}
                            size={40}
                            color={slides[currentSlide].color}
                        />
                    </MotiView>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-foreground mb-2 text-center">
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
