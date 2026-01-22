import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, AnimatePresence } from "moti";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    withSequence,
    withDelay,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Polyline } from "react-native-svg";
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
        type: "object",
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

// Brush stroke path for painting animation - Shifted +2% X, +9% Y
const brushPath = [
    { x: 64, y: 59 }, { x: 67, y: 57 }, { x: 70, y: 56 }, { x: 73, y: 57 }, { x: 76, y: 59 },
    { x: 63, y: 65 }, { x: 66, y: 63 }, { x: 70, y: 62 }, { x: 74, y: 63 }, { x: 77, y: 65 },
    { x: 62, y: 73 }, { x: 66, y: 71 }, { x: 70, y: 70 }, { x: 74, y: 71 }, { x: 78, y: 73 },
    { x: 64, y: 81 }, { x: 68, y: 79 }, { x: 72, y: 79 }, { x: 76, y: 81 },
];

const ObjectRemovalAnimation = ({
    beforeImage,
    afterImage,
}: {
    beforeImage: any;
    afterImage: any;
}) => {
    const [phase, setPhase] = useState<'before' | 'painting' | 'painted' | 'removing' | 'after'>('before');
    const [points, setPoints] = useState<string>("");
    const [currentPoint, setCurrentPoint] = useState<{ x: number, y: number } | null>(null);

    // Dimensions for the image/svg container
    const imgWidth = width - 48; // px-6 padding total 48
    const imgHeight = 192; // h-48

    useEffect(() => {
        let isCancelled = false;

        const delay = (ms: number) => new Promise<void>(resolve => {
            const timeout = setTimeout(() => {
                if (!isCancelled) resolve();
            }, ms);
        });

        const runAnimation = async () => {
            if (isCancelled) return;

            // Reset
            setPhase('before');
            setPoints("");
            setCurrentPoint(null);

            await delay(800);
            if (isCancelled) return;

            // Start Painting
            setPhase('painting');
            let currentPointsStr = "";

            for (const point of brushPath) {
                if (isCancelled) return;
                // Convert percentage to pixels
                const px = (point.x / 100) * imgWidth;
                const py = (point.y / 100) * imgHeight;

                currentPointsStr += `${px},${py} `;
                setPoints(currentPointsStr);
                setCurrentPoint({ x: px, y: py });

                await delay(60); // Creating stroke effect
            }

            if (isCancelled) return;
            setCurrentPoint(null);
            setPhase('painted');

            await delay(600);
            if (isCancelled) return;

            setPhase('removing');
            await delay(800);
            if (isCancelled) return;

            setPhase('after');
            await delay(2500); // Show result for longer

            if (isCancelled) return;
            // Loop
            runAnimation();
        };

        runAnimation();

        return () => { isCancelled = true; };
    }, [imgWidth]);

    return (
        <View className="relative w-full h-48 rounded-3xl overflow-hidden bg-muted/20">
            {/* Before Image */}
            <MotiView
                className="absolute w-full h-full"
                animate={{ opacity: phase === 'after' ? 0 : 1 }}
                transition={{ type: "timing", duration: 500 }}
            >
                <Image source={beforeImage} className="w-full h-full" resizeMode="cover" />
            </MotiView>

            {/* After Image */}
            <MotiView
                className="absolute w-full h-full"
                animate={{ opacity: phase === 'after' ? 1 : 0 }}
                transition={{ type: "timing", duration: 500 }}
            >
                <Image source={afterImage} className="w-full h-full" resizeMode="cover" />
            </MotiView>

            {/* SVG Canvas for Painting */}
            {phase !== 'after' && (
                <View className="absolute inset-0 w-full h-full pointer-events-none">
                    <Svg height="100%" width="100%" viewBox={`0 0 ${imgWidth} ${imgHeight}`}>
                        <Polyline
                            points={points}
                            fill="none"
                            stroke="rgba(255, 100, 100, 0.6)"
                            strokeWidth="24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>
            )}

            {/* Brush Cursor */}
            <AnimatePresence>
                {phase === 'painting' && currentPoint && (
                    <MotiView
                        from={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, translateX: currentPoint.x - 16, translateY: currentPoint.y - 16 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="absolute w-8 h-8 rounded-full border-2 border-white bg-primary/30 z-20"
                    >
                        <View className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full items-center justify-center shadow-lg">
                            <Ionicons name="trash-outline" size={10} color="white" />
                        </View>
                    </MotiView>
                )}
            </AnimatePresence>

            {/* Sparkles effect for removing phase */}
            <AnimatePresence>
                {phase === 'removing' && (
                    <View className="absolute inset-0 items-center justify-center">
                        {/* Center Glow */}
                        <MotiView
                            from={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ type: "timing", duration: 500 }}
                            className="w-16 h-16 rounded-full bg-primary/40 absolute"
                            style={{ left: (70 / 100) * imgWidth, top: (72 / 100) * imgHeight }}
                        />

                        {/* Particles */}
                        {[...Array(6)].map((_, i) => (
                            <MotiView
                                key={i}
                                className="absolute w-2 h-2 bg-primary rounded-full"
                                style={{ left: (70 / 100) * imgWidth, top: (72 / 100) * imgHeight }}
                                from={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
                                animate={{
                                    opacity: 0,
                                    scale: 0,
                                    translateX: Math.cos(i * Math.PI / 3) * 50,
                                    translateY: Math.sin(i * Math.PI / 3) * 50,
                                }}
                                transition={{ type: "timing", duration: 600 }}
                            />
                        ))}
                    </View>
                )}
            </AnimatePresence>

            {/* Status Label */}
            <MotiView
                className="absolute bottom-3 left-1/2 px-3 py-1.5 rounded-full z-30"
                style={{ transform: [{ translateX: -40 }] }} // Center approximation
                animate={{
                    backgroundColor: phase === 'after' ? '#E86A12' : 'rgba(0,0,0,0.6)',
                }}
            >
                <Text className="text-white text-xs font-medium">
                    {phase === 'before' && 'Silmek istediğiniz alanı çizin'}
                    {phase === 'painting' && 'Boyama...'}
                    {phase === 'painted' && 'Seçildi ✓'}
                    {phase === 'removing' && 'Siliniyor...'}
                    {phase === 'after' && 'Tamamlandı! ✨'}
                </Text>
            </MotiView>
        </View>
    );
};

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

            {/* Slider Line/Handle Removed as per request */}
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

    // Render appropriate comparison based on slide type
    const renderComparison = () => {
        const slide = slides[currentSlide];

        // Custom animation for object removal
        if (slide.type === "object") {
            return (
                <ObjectRemovalAnimation
                    beforeImage={slide.beforeImage}
                    afterImage={slide.afterImage}
                />
            );
        }

        // Slider for everything else (Style, Color)
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
