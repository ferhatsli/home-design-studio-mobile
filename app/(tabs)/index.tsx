import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { SoftCard } from "@/components/ui/SoftCard";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

const features = [
  {
    id: "style",
    title: "Stil Değişikliği",
    description: "Odanızın stilini tamamen değiştirin",
    icon: "brush-outline" as const,
    route: "/style-change",
  },
  {
    id: "erase",
    title: "Obje Silme",
    description: "İstenmeyen nesneleri kaldırın",
    icon: "trash-outline" as const,
    route: "/object-remove",
  },
  {
    id: "color",
    title: "Renk Değişikliği",
    description: "Duvar ve mobilya renklerini değiştirin",
    icon: "color-palette-outline" as const,
    route: "/color-change",
  },
  {
    id: "garden",
    title: "Bahçe Tasarımı",
    description: "Bahçenizi yeniden tasarlayın",
    icon: "leaf-outline" as const,
    route: "/garden-redesign",
  },
  {
    id: "exterior",
    title: "Dış Cephe",
    description: "Evinizin dış görünümünü yenileyin",
    icon: "home-outline" as const,
    route: "/exterior-redesign",
  },
  {
    id: "furniture",
    title: "Mobilya Değiştir",
    description: "Mobilya stillerini değiştirin",
    icon: "bed-outline" as const,
    route: "/furniture-replace",
  },
  {
    id: "fill",
    title: "Boşluk Doldur",
    description: "Eksik parçaları alana ekleyin",
    icon: "add-circle-outline" as const,
    route: "/fill-spaces",
  },
  {
    id: "wall",
    title: "Duvar Yenile",
    description: "Duvarları yeniden tasarlayın",
    icon: "layers-outline" as const,
    route: "/wall-refresh",
  },
  {
    id: "floor",
    title: "Zemin Değiştir",
    description: "Zeminlerinize yeni materyal uygulayın",
    icon: "grid-outline" as const,
    route: "/floor-replace",
  },
];

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
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 500 }}
          className="px-4 mb-6"
        >
          <SoftCard variant="elevated" padding="lg" className="bg-primary">
            <Text className="text-white text-xl font-bold mb-2">
              AI ile Odanızı Dönüştürün
            </Text>
            <Text className="text-white/80 text-sm mb-4">
              Fotoğrafınızı yükleyin, stilinizi seçin ve anında sonucu görün
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/style-change")}
              className="bg-white rounded-full py-3 px-6 self-start flex-row items-center"
            >
              <Text className="text-primary font-semibold mr-2">Başla</Text>
              <Ionicons name="arrow-forward" size={16} color="#E86A12" />
            </TouchableOpacity>
          </SoftCard>
        </MotiView>

        {/* Features Section */}
        <View className="px-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Özellikler
          </Text>
          <View className="gap-3">
            {features.map((feature, index) => (
              <MotiView
                key={feature.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 400, delay: index * 50 }}
              >
                <TouchableOpacity onPress={() => router.push(feature.route as any)}>
                  <SoftCard variant="elevated" padding="none">
                    <View className="flex-row items-center p-4">
                      <View className="w-12 h-12 bg-accent rounded-2xl items-center justify-center mr-4">
                        <Ionicons
                          name={feature.icon}
                          size={24}
                          color="#E86A12"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-foreground font-semibold">
                          {feature.title}
                        </Text>
                        <Text className="text-muted-foreground text-sm mt-0.5">
                          {feature.description}
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#737373"
                      />
                    </View>
                  </SoftCard>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
