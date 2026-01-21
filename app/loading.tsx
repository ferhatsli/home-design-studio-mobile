import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useRoom } from "@/context/RoomContext";
import { useRoomTransform, TransformAction } from "@/hooks/useRoomTransform";

export default function LoadingScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ action: string }>();
    const {
        originalImage,
        roomType,
        designStyle,
        selectedColor,
        maskPoints,
        setTransformedImage,
        deductCredits,
    } = useRoom();
    const { transformRoom, isLoading, progress, result } = useRoomTransform();
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Spin animation
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    useEffect(() => {
        const action = (params.action || "redesign") as TransformAction;

        if (!originalImage) {
            router.back();
            return;
        }

        const runTransform = async () => {
            const creditsNeeded = action === "erase" ? 4 : 8;

            if (!deductCredits(creditsNeeded)) {
                router.push("/paywall");
                return;
            }

            const result = await transformRoom({
                imageBase64: originalImage,
                roomType,
                designStyle,
                action,
                color: selectedColor,
                maskData: maskPoints.length > 0 ? JSON.stringify(maskPoints) : undefined,
            });

            if (result.success && result.imageUrl) {
                setTransformedImage(result.imageUrl);
                router.replace("/result");
            } else {
                router.back();
            }
        };

        runTransform();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <SafeAreaView className="flex-1 bg-background items-center justify-center">
            <MotiView
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "timing", duration: 500 }}
                className="items-center"
            >
                {/* Spinner */}
                <View className="w-24 h-24 mb-8">
                    <Animated.View
                        style={{
                            width: 96,
                            height: 96,
                            borderRadius: 48,
                            borderWidth: 4,
                            borderColor: "#E5E5E5",
                            borderTopColor: "#E86A12",
                            transform: [{ rotate: spin }],
                        }}
                    />
                </View>

                {/* Progress Text */}
                <Text className="text-2xl font-bold text-foreground mb-2">
                    {Math.round(progress)}%
                </Text>
                <Text className="text-muted-foreground text-center px-8">
                    AI odanızı dönüştürüyor...{"\n"}Bu birkaç saniye sürebilir.
                </Text>

                {/* Progress Bar */}
                <View className="w-64 h-2 bg-muted rounded-full mt-8 overflow-hidden">
                    <MotiView
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "timing", duration: 300 }}
                        className="h-full bg-primary rounded-full"
                    />
                </View>
            </MotiView>
        </SafeAreaView>
    );
}
