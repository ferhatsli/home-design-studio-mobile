
import React, { useState, useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import { Image, ImageSource } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
    withDelay,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ui";
import { PillButton } from "@/components/ui/PillButton";
import {
    roomReference,
    roomModern,
    roomScandinavian,
    roomMinimalist,
    roomIndustrial,
} from "@/assets";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.72;
const GRADIENT_HEIGHT = 120;

// Image sequence array
const STYLES = [
    { name: "Referans", image: roomReference },
    { name: "Modern", image: roomModern },
    { name: "İskandinav", image: roomScandinavian },
    { name: "Minimalist", image: roomMinimalist },
    { name: "Endüstriyel", image: roomIndustrial },
];

export default function OnboardingStyleScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
    const sliderPosition = useSharedValue(100);

    // All unique images for preloading
    const allImages = useMemo(() => STYLES.map(s => s.image), []);

    useEffect(() => {
        const runAnimation = () => {
            // Reset slider to right
            sliderPosition.value = 100;

            // Animate to left
            sliderPosition.value = withDelay(
                100,
                withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }, (finished) => {
                    if (finished) {
                        runOnJS(advanceToNext)();
                    }
                })
            );
        };

        runAnimation();
    }, [currentIndex]);

    const advanceToNext = () => {
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % STYLES.length);
        }, 500);
    };

    const handleNext = () => {
        router.push("/onboarding/object-removal-slide");
    };

    const clipStyle = useAnimatedStyle(() => ({
        width: `${sliderPosition.value}%`,
    }));

    // Current images
    const beforeImage = STYLES[currentIndex].image;
    const afterImage = STYLES[(currentIndex + 1) % STYLES.length].image;

    return (
        <View className="flex-1 bg-white">
            {/* Preload all images in background (hidden) */}
            <View style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                {allImages.map((img, idx) => (
                    <Image
                        key={idx}
                        source={img}
                        style={{ width: 1, height: 1 }}
                        priority="high"
                        cachePolicy="memory-disk"
                    />
                ))}
            </View>

            {/* Image Container */}
            <View style={{ height: IMAGE_HEIGHT }}>
                <View
                    className="relative overflow-hidden"
                    style={{ height: IMAGE_HEIGHT, width: width }}
                >
                    {/* After Image (Background - revealed) */}
                    <Image
                        source={afterImage}
                        style={{ width: width, height: IMAGE_HEIGHT }}
                        contentFit="cover"
                        priority="high"
                        cachePolicy="memory-disk"
                    />

                    {/* Before Image (Foreground - clipped) */}
                    <Animated.View
                        className="absolute top-0 left-0 bottom-0 overflow-hidden"
                        style={clipStyle}
                    >
                        <Image
                            source={beforeImage}
                            style={{ width: width, height: IMAGE_HEIGHT }}
                            contentFit="cover"
                            priority="high"
                            cachePolicy="memory-disk"
                        />
                    </Animated.View>

                    {/* Gradient Fade at Bottom */}
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(255,255,255,0.3)",
                            "rgba(255,255,255,0.8)",
                            "#ffffff",
                        ]}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: GRADIENT_HEIGHT,
                        }}
                    />
                </View>
            </View>

            {/* Bottom Content */}
            <SafeAreaView
                className="flex-1 px-10 items-center"
                style={{ paddingTop: -5 }}
            >
                <View className="items-center mb-8">
                    <ThemedText
                        weight="bold"
                        className="text-foreground mb-3 text-center"
                        style={{ fontSize: 35, lineHeight: 38, fontWeight: "800" }}
                    >
                        Stil Değiştir
                    </ThemedText>
                    <ThemedText
                        className="text-center"
                        style={{ fontSize: 16, lineHeight: 24, color: "#1a1a1aff" }}
                    >
                        Odanızı Modern, İskandinav, Minimalist ve daha{"\n"}birçok
                        tarzda yeniden tasarlayın
                    </ThemedText>
                </View>

                {/* Button */}
                <View className="w-full px-2">
                    <PillButton onPress={handleNext} size="lg" fullWidth>
                        Devam
                    </PillButton>
                </View>
            </SafeAreaView>
        </View>
    );
}
