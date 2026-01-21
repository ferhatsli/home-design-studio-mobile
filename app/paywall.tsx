import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { PillButton } from "@/components/ui/PillButton";
import { SoftCard } from "@/components/ui/SoftCard";

const plans = [
    {
        id: "weekly",
        name: "Haftalık",
        price: "₺49,99",
        period: "hafta",
        credits: 50,
        popular: false,
    },
    {
        id: "monthly",
        name: "Aylık",
        price: "₺149,99",
        period: "ay",
        credits: 200,
        popular: true,
        savings: "25% tasarruf",
    },
    {
        id: "yearly",
        name: "Yıllık",
        price: "₺999,99",
        period: "yıl",
        credits: 3000,
        popular: false,
        savings: "45% tasarruf",
    },
];

const features = [
    "Tüm dönüşüm türlerine erişim",
    "Yüksek kaliteli sonuçlar",
    "Öncelikli işlem sırası",
    "Reklamsız deneyim",
    "7/24 destek",
];

export default function PaywallScreen() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = React.useState("monthly");

    const handlePurchase = () => {
        // TODO: Implement in-app purchase
        console.log("Purchase:", selectedPlan);
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-card rounded-full items-center justify-center shadow-sm"
                >
                    <Ionicons name="close" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">Premium</Text>
                <View className="w-10" />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-4 pb-8"
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    className="items-center mb-8"
                >
                    <LinearGradient
                        colors={["#E86A12", "#F59E0B"]}
                        className="w-20 h-20 rounded-3xl items-center justify-center mb-4"
                    >
                        <Ionicons name="diamond" size={40} color="#FFFFFF" />
                    </LinearGradient>
                    <Text className="text-2xl font-bold text-foreground text-center">
                        Premium'a Geçin
                    </Text>
                    <Text className="text-muted-foreground text-center mt-2">
                        Sınırsız dönüşüm yapın ve tüm özelliklere erişin
                    </Text>
                </MotiView>

                {/* Plans */}
                <View className="gap-3 mb-8">
                    {plans.map((plan, index) => (
                        <MotiView
                            key={plan.id}
                            from={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ delay: index * 100 }}
                        >
                            <TouchableOpacity
                                onPress={() => setSelectedPlan(plan.id)}
                                activeOpacity={0.8}
                            >
                                <SoftCard
                                    variant="elevated"
                                    className={`border-2 ${selectedPlan === plan.id
                                            ? "border-primary"
                                            : "border-transparent"
                                        }`}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-1">
                                            <View className="flex-row items-center gap-2">
                                                <Text className="font-semibold text-foreground text-lg">
                                                    {plan.name}
                                                </Text>
                                                {plan.popular && (
                                                    <View className="bg-primary px-2 py-0.5 rounded-full">
                                                        <Text className="text-white text-xs font-medium">
                                                            Popüler
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                            <Text className="text-muted-foreground text-sm mt-1">
                                                {plan.credits} kredi / {plan.period}
                                                {plan.savings && (
                                                    <Text className="text-green-600"> • {plan.savings}</Text>
                                                )}
                                            </Text>
                                        </View>
                                        <View className="items-end">
                                            <Text className="text-xl font-bold text-foreground">
                                                {plan.price}
                                            </Text>
                                            <Text className="text-muted-foreground text-xs">
                                                /{plan.period}
                                            </Text>
                                        </View>
                                    </View>
                                </SoftCard>
                            </TouchableOpacity>
                        </MotiView>
                    ))}
                </View>

                {/* Features */}
                <View className="mb-8">
                    <Text className="font-semibold text-foreground mb-4">
                        Premium Avantajları
                    </Text>
                    {features.map((feature, index) => (
                        <View key={index} className="flex-row items-center mb-3">
                            <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center mr-3">
                                <Ionicons name="checkmark" size={14} color="#10B981" />
                            </View>
                            <Text className="text-foreground">{feature}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Purchase Button */}
            <View className="px-4 pb-8 pt-4">
                <PillButton onPress={handlePurchase} fullWidth size="lg">
                    Satın Al
                </PillButton>
                <Text className="text-center text-muted-foreground text-xs mt-3">
                    İstediğiniz zaman iptal edebilirsiniz
                </Text>
            </View>
        </SafeAreaView>
    );
}
