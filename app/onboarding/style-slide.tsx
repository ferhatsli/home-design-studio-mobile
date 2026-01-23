
import React, { useState, useEffect } from "react";
import { View, Image, Dimensions, ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
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

interface TransitionSlideProps {
    beforeImage: ImageSourcePropType;
    afterImage: ImageSourcePropType;
    onAnimationComplete: () => void;
}

const TransitionSlide: React.FC<TransitionSlideProps> = ({
    beforeImage,
    afterImage,
    onAnimationComplete,
}) => {
    const sliderPosition = useSharedValue(100);

    useEffect(() => {
        // Start animation immediately
        sliderPosition.value = withTiming(
            0,
            { duration: 2500, easing: Easing.inOut(Easing.ease) },
            (finished) => {
                if (finished) {
                    runOnJS(onAnimationComplete)();
                }
            }
        );
    }, []);

    const clipStyle = useAnimatedStyle(() => ({
        width: `${sliderPosition.value}%`,
    }));

    return (
        <View
            className="relative overflow-hidden"
            style={{ height: IMAGE_HEIGHT, width: width }}
        >
            {/* After Image (The one revealed as slider moves left) */}
            <Image
                source={afterImage}
                style={{ width: width, height: IMAGE_HEIGHT }}
                resizeMode="cover"
            />

            {/* Before Image (The one closing/being covered) - clipped from LEFT */}
            <Animated.View
                className="absolute top-0 left-0 bottom-0 overflow-hidden"
                style={clipStyle}
            >
                <Image
                    source={beforeImage}
                    style={{ width: width, height: IMAGE_HEIGHT }}
                    resizeMode="cover"
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
    );
};

export default function OnboardingStyleScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const handleAnimationComplete = () => {
        // Add a small delay before starting the next one for better UX
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % STYLES.length);
        }, 500);
    };

    const handleNext = () => {
        router.push("/(tabs)");
    };

    // Calculate current pair
    const beforeStyle = STYLES[currentIndex];
    const afterStyle = STYLES[(currentIndex + 1) % STYLES.length];

    return (
        <View className="flex-1 bg-white">
            {/* Image Container */}
            <View style={{ height: IMAGE_HEIGHT }}>
                {/* 
                  Key prop is CRITICAL here. 
                  Changing the key forces React to destroy the old component 
                  and create a brand new one. This ensures the useSharedValue 
                  in TransitionSlide always starts fresh at 100.
                */}
                <TransitionSlide
                    key={currentIndex}
                    beforeImage={beforeStyle.image}
                    afterImage={afterStyle.image}
                    onAnimationComplete={handleAnimationComplete}
                />
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
