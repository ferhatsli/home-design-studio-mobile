import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { SoftCard } from "@/components/ui/SoftCard";
import { supabase } from "@/lib/supabase";

interface Transformation {
    id: string;
    original_image_url: string;
    transformed_image_url: string;
    transformation_type: string;
    style_name: string | null;
    created_at: string;
}

const getTransformationLabel = (type: string): string => {
    switch (type) {
        case "style_change":
            return "Stil Değişikliği";
        case "color_change":
            return "Renk Değişikliği";
        case "object_remove":
            return "Nesne Silme";
        case "exterior_redesign":
            return "Dış Cephe";
        case "furniture_replace":
            return "Mobilya Değişikliği";
        case "fill_spaces":
            return "Boşluk Doldurma";
        case "wall_refresh":
            return "Duvar Yenileme";
        case "floor_replace":
            return "Zemin Değişikliği";
        default:
            return "Dönüşüm";
    }
};

export default function HistoryScreen() {
    const router = useRouter();
    const [transformations, setTransformations] = useState<Transformation[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchHistory = async () => {
        try {
            const { data, error } = await supabase
                .from("room_transformations")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(50);

            if (error) {
                console.error("Error fetching history:", error);
                return;
            }

            setTransformations(data || []);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchHistory();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-24"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View className="px-4 pt-4 pb-6">
                    <Text className="text-2xl font-bold text-foreground">Geçmiş</Text>
                    <Text className="text-muted-foreground mt-1">
                        Önceki dönüşümleriniz
                    </Text>
                </View>

                {/* Content */}
                <View className="px-4">
                    {loading ? (
                        <View className="items-center py-12">
                            <Text className="text-muted-foreground">Yükleniyor...</Text>
                        </View>
                    ) : transformations.length === 0 ? (
                        <View className="items-center py-12">
                            <Ionicons name="time-outline" size={64} color="#D1D5DB" />
                            <Text className="text-muted-foreground mt-4 text-center">
                                Henüz dönüşüm yapmadınız.{"\n"}İlk dönüşümünüzü oluşturun!
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push("/(tabs)/create")}
                                className="mt-4 bg-primary rounded-full px-6 py-3"
                            >
                                <Text className="text-white font-semibold">Başla</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="gap-4">
                            {transformations.map((item, index) => (
                                <MotiView
                                    key={item.id}
                                    from={{ opacity: 0, translateY: 20 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: "timing", duration: 400, delay: index * 50 }}
                                >
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <SoftCard variant="elevated" padding="none" className="overflow-hidden">
                                            <View className="flex-row h-32">
                                                {/* Before Image */}
                                                <View className="flex-1">
                                                    <Image
                                                        source={{ uri: item.original_image_url }}
                                                        className="w-full h-full"
                                                        resizeMode="cover"
                                                    />
                                                    <View className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded-full">
                                                        <Text className="text-white text-xs">Önce</Text>
                                                    </View>
                                                </View>

                                                {/* After Image */}
                                                <View className="flex-1">
                                                    <Image
                                                        source={{ uri: item.transformed_image_url }}
                                                        className="w-full h-full"
                                                        resizeMode="cover"
                                                    />
                                                    <View className="absolute top-2 right-2 bg-primary px-2 py-1 rounded-full">
                                                        <Text className="text-white text-xs">Sonra</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* Info */}
                                            <View className="p-3">
                                                <View className="flex-row items-center justify-between">
                                                    <View>
                                                        <Text className="font-semibold text-foreground">
                                                            {getTransformationLabel(item.transformation_type)}
                                                        </Text>
                                                        {item.style_name && (
                                                            <Text className="text-muted-foreground text-sm">
                                                                {item.style_name}
                                                            </Text>
                                                        )}
                                                    </View>
                                                    <Text className="text-muted-foreground text-xs">
                                                        {formatDate(item.created_at)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </SoftCard>
                                    </TouchableOpacity>
                                </MotiView>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
