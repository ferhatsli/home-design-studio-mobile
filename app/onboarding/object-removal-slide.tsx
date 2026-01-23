import React, { useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    useAnimatedProps,
    interpolate,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { ThemedText } from "@/components/ui";
import { PillButton } from "@/components/ui/PillButton";
import { removeObjBefore, removeObjAfter } from "@/assets";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.72;
const GRADIENT_HEIGHT = 120;

// Create an animated component for the SVG Path
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function ObjectRemovalSlide() {
    const router = useRouter();

    // Animation Values
    const paintProgress = useSharedValue(0);
    const fadeProgress = useSharedValue(0);

    // All images for preloading
    const allImages = useMemo(() => [removeObjBefore, removeObjAfter], []);

    useEffect(() => {
        const runAnimation = () => {
            // Reset
            paintProgress.value = 0;
            fadeProgress.value = 0;

            // 1. Wait a bit, then Draw Paint (0 -> 1)
            paintProgress.value = withDelay(
                1000,
                withTiming(1, { duration: 1500 })
            );

            // 2. Wait for paint to finish, then Fade Out Before + Paint (0 -> 1)
            fadeProgress.value = withDelay(
                2800,
                withTiming(1, { duration: 800 })
            );
        };

        runAnimation();

        const interval = setInterval(runAnimation, 5000);
        return () => clearInterval(interval);
    }, []);

    // Derived Animations
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: interpolate(paintProgress.value, [0, 1], [1000, 0]),
    }));

    const beforeContainerStyle = useAnimatedStyle(() => ({
        opacity: interpolate(fadeProgress.value, [0, 1], [1, 0]),
    }));

    const handleNext = () => {
        // Navigate to next slide or finish
        router.push("/onboarding/exterior-slide");
    };

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
                    {/* Layer 1: After Image (Background) */}
                    <Image
                        source={removeObjAfter}
                        style={{ width: width, height: IMAGE_HEIGHT }}
                        contentFit="cover"
                        priority="high"
                        cachePolicy="memory-disk"
                    />

                    {/* Layer 2: Before Image + Paint Overlay (Foreground Group) */}
                    <Animated.View
                        style={[
                            { ...SimpleStyle.fill, height: IMAGE_HEIGHT, width: width },
                            beforeContainerStyle
                        ]}
                    >
                        <Image
                            source={removeObjBefore}
                            style={{ width: width, height: IMAGE_HEIGHT }}
                            contentFit="cover"
                            priority="high"
                            cachePolicy="memory-disk"
                        />

                        <Svg height={IMAGE_HEIGHT} width={width} style={SimpleStyle.absolute}>
                            <AnimatedPath
                                d={`
                                    M ${width * 0.22},${IMAGE_HEIGHT * 0.52} 
                                    Q ${width * 0.42},${IMAGE_HEIGHT * 0.47} ${width * 0.62},${IMAGE_HEIGHT * 0.52}
                                    t ${-width * 0.1},${IMAGE_HEIGHT * 0.05}
                                    t ${width * 0.1},${IMAGE_HEIGHT * 0.05}
                                    t ${-width * 0.1},${IMAGE_HEIGHT * 0.05}
                                    t ${width * 0.1},${IMAGE_HEIGHT * 0.05}
                                `}
                                stroke="#fde047" // Yellowish highlight color
                                strokeWidth={80}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray={[1000, 1000]}
                                animatedProps={animatedProps}
                                fill="none"
                                opacity={0.7}
                            />
                        </Svg>
                    </Animated.View>

                    {/* Gradient Fade */}
                    <LinearGradient
                        colors={["transparent", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.8)", "#ffffff"]}
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
            <SafeAreaView className="flex-1 px-10 items-center" style={{ paddingTop: -5 }}>
                <View className="items-center mb-8">
                    <ThemedText
                        weight="bold"
                        className="text-foreground mb-3 text-center"
                        style={{ fontSize: 35, lineHeight: 38, fontWeight: '800' }}
                    >
                        Objeleri Kaldır
                    </ThemedText>
                    <ThemedText
                        className="text-center"
                        style={{ fontSize: 16, lineHeight: 24, color: '#1a1a1aff' }}
                    >
                        İstemediğiniz objeleri fotoğraflarınızdan{"\n"}saniyeler içinde silin
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

const SimpleStyle = {
    fill: {
        position: "absolute" as "absolute",
        top: 0,
        left: 0,
    },
    absolute: {
        position: "absolute" as "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
}
