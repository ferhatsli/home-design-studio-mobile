import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from "react-native-reanimated";
import { SoftCard } from "@/components/ui/SoftCard";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";
import {
  heroBefore,
  heroAfter,
  styleBefore,
  styleAfter,
  objectRemoveBefore,
  objectRemoveAfter,
  inspirationBefore3,
  inspirationAfter3,
  demoGardenFront,
  demoGardenTerrace,
  exteriorBefore,
  exteriorAfter,
  inspirationBefore5,
  inspirationAfter5,
  inspirationBefore6,
  inspirationAfter6,
  inspirationBefore7,
  inspirationAfter7,
  inspirationBefore8,
  inspirationAfter8
} from "@/assets";

const { width } = Dimensions.get("window");

const features = [
  {
    id: "style",
    title: "Stil Değişikliği",
    description: "Odanızın stilini tamamen değiştirin",
    beforeImage: styleBefore,
    afterImage: styleAfter,
    route: "/style-change",
  },
  {
    id: "erase",
    title: "Obje Silme",
    description: "İstenmeyen nesneleri kaldırın",
    beforeImage: objectRemoveBefore,
    afterImage: objectRemoveAfter,
    route: "/object-remove",
  },
  {
    id: "color",
    title: "Renk Değişikliği",
    description: "Duvar ve mobilya renklerini değiştirin",
    beforeImage: inspirationBefore3,
    afterImage: inspirationAfter3,
    route: "/color-change",
  },
  {
    id: "garden",
    title: "Bahçe Tasarımı",
    description: "Bahçenizi yeniden tasarlayın",
    beforeImage: demoGardenFront,
    afterImage: demoGardenTerrace,
    route: "/garden-redesign",
  },
  {
    id: "exterior",
    title: "Dış Cephe",
    description: "Evinizin dış görünümünü yenileyin",
    beforeImage: exteriorBefore,
    afterImage: exteriorAfter,
    route: "/exterior-redesign",
  },
  {
    id: "furniture",
    title: "Mobilya Değiştir",
    description: "Mobilya stillerini değiştirin",
    beforeImage: inspirationBefore5,
    afterImage: inspirationAfter5,
    route: "/furniture-replace",
  },
  {
    id: "fill",
    title: "Boşluk Doldur",
    description: "Eksik parçaları alana ekleyin",
    beforeImage: inspirationBefore6,
    afterImage: inspirationAfter6,
    route: "/fill-spaces",
  },
  {
    id: "wall",
    title: "Duvar Yenile",
    description: "Duvarları yeniden tasarlayın",
    beforeImage: inspirationBefore7,
    afterImage: inspirationAfter7,
    route: "/wall-refresh",
  },
  {
    id: "floor",
    title: "Zemin Değiştir",
    description: "Zeminlerinize yeni materyal uygulayın",
    beforeImage: inspirationBefore8,
    afterImage: inspirationAfter8,
    route: "/floor-replace",
  },
];

const HeroBanner = () => {
  const router = useRouter();
  const sliderPosition = useSharedValue(0);

  useEffect(() => {
    // Auto-oscillating effect matching web exactly
    sliderPosition.value = withRepeat(
      withTiming(100, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  // Before image clip - same as web: clipPath: inset(0 ${100 - sliderPosition}% 0 0)
  const clipStyle = useAnimatedStyle(() => ({
    width: `${sliderPosition.value}%`,
  }));

  const lineStyle = useAnimatedStyle(() => ({
    left: `${sliderPosition.value}%`,
  }));

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 100 }}
      className="px-4 mb-6"
    >
      <View className="rounded-3xl overflow-hidden shadow-lg bg-background">
        {/* Image Comparison Slider */}
        <View className="relative w-full aspect-[16/9]">
          {/* After Image (Background) - full width */}
          <Image
            source={heroAfter}
            className="absolute w-full h-full"
            resizeMode="cover"
          />

          {/* Before Image (Clipped from left) - matches web clipPath */}
          <Animated.View
            className="absolute top-0 left-0 bottom-0 overflow-hidden"
            style={clipStyle}
          >
            <Image
              source={heroBefore}
              style={{ width: width - 32, height: '100%' }}
              resizeMode="cover"
            />
          </Animated.View>

          {/* Slider Line */}
          <Animated.View
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
            style={[lineStyle, { transform: [{ translateX: -2 }] }]}
          />
        </View>

        {/* Footer - same as web */}
        <View className="bg-primary px-5 py-3 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold text-white">Anında Yenile</Text>
            <Text className="text-xs text-white/70">Mekanını Saniyeler İçinde Dönüştür</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/style-change")}
            className="bg-white rounded-full px-5 py-2 flex-row items-center gap-1"
          >
            <Text className="text-primary font-medium text-sm">Dene</Text>
            <Ionicons name="chevron-forward" size={16} color="#E86A12" />
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { credits } = useRoom();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-foreground">
                Merhaba! 👋
              </Text>
              <Text className="text-muted-foreground mt-1">
                Bugün ne tasarlayalım?
              </Text>
            </View>
            <CreditBadge credits={credits} />
          </View>
        </View>

        {/* Hero Banner */}
        <HeroBanner />

        {/* Features Section */}
        <View className="px-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Özellikler
          </Text>
          <View className="gap-4">
            {features.map((feature, index) => (
              <MotiView
                key={feature.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 400, delay: index * 50 }}
              >
                <TouchableOpacity
                  onPress={() => router.push(feature.route as any)}
                  className="rounded-3xl overflow-hidden shadow-sm bg-card mb-2"
                >
                  {/* Before/After Split Images */}
                  <View className="relative h-44 flex-row">
                    {/* Before - Left */}
                    <View className="flex-1 overflow-hidden relative">
                      <Image
                        source={feature.beforeImage}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>

                    {/* After - Right */}
                    <View className="flex-1 overflow-hidden relative">
                      <Image
                        source={feature.afterImage}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>

                    {/* Divider */}
                    <View className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30 -ml-[0.5px]" />
                  </View>

                  {/* Footer */}
                  <View className="bg-primary px-4 py-3 flex-row items-center justify-between">
                    <View className="flex-1 py-1">
                      <Text className="font-semibold text-white text-base">{feature.title}</Text>
                      <Text className="text-sm text-white/80" numberOfLines={1}>{feature.description}</Text>
                    </View>

                    <View className="bg-white rounded-full px-4 py-2 flex-row items-center gap-1 ml-3">
                      <Text className="text-primary font-medium text-sm">Dene</Text>
                      <Ionicons name="chevron-forward" size={16} color="#E86A12" />
                    </View>
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
